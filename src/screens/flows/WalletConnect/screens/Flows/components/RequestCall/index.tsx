import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Text, View } from 'react-native';

import WarningIcon from '@/components/icons/svg/WarningIcon.svg';
import { TOKENS } from '@/constants/assets';
import { isICP } from '@/constants/canister';
import { FontStyles } from '@/constants/theme';
import { TRUST_AND_SECURITY_URL } from '@/constants/urls';
import { Nullable } from '@/interfaces/general';
import {
  WallectConnectFlowsData,
  WCWhiteListItem,
} from '@/interfaces/walletConnect';
import KeyRing from '@/modules/keyring';
import { useAppSelector } from '@/redux/hooks';
import { getDabNfts, getDabToken } from '@/services/DAB';
import { formatAssetBySymbol } from '@/utils/currencies';
import { addSpacesAndCapitalize } from '@/utils/strings';

import { getAssetAmount, getNFTId, TRANSFER_METHOD_NAMES } from '../../utils';
import ActionItem from '../ActionItem';
import TransferItem from '../TransferItem';
import styles from './styles';

export interface TransferToken {
  icon?: string;
  imageUrl?: string;
  amount: number | string;
  symbol: string;
  usdValue: number | string | null;
}
interface Props extends WallectConnectFlowsData {
  canisterInfo: WCWhiteListItem;
}

function RequestCall(props: Props) {
  const canisterInfo = props.canisterInfo;
  const { shouldWarn, canisterId, methodName, decodedArguments } = props.args;
  const { icpPrice } = useAppSelector(state => state.icp);
  const formattedMethodName = addSpacesAndCapitalize(methodName);
  const [token, setToken] = useState<Nullable<TransferToken>>(null);
  const [nftId, setNFTId] = useState<Nullable<string>>(null);
  const [unknown, setUnknown] = useState(false);
  const isTransfer = TRANSFER_METHOD_NAMES.includes(methodName);
  const isLoadingTransfer = isTransfer && !token && !nftId && !unknown;

  const goToLearnMore = () => Linking.openURL(TRUST_AND_SECURITY_URL);

  const getNFTCanisters = async () => {
    const canisters = await getDabNfts();
    const ids = canisters?.map(canister => `${canister?.principal_id}`);
    return ids;
  };

  useEffect(() => {
    const getInfo = async () => {
      const nftIds = await getNFTCanisters();
      if (nftIds?.includes(canisterId)) {
        setNFTId(getNFTId({ methodName, decodedArguments }));
      } else {
        const tokenData = isICP(canisterId)
          ? TOKENS.ICP
          : await getDabToken(canisterId);
        if (!tokenData) {
          setUnknown(true);
        }
        const tokenInfo = await KeyRing.getInstance().getTokenInfo({
          canisterId,
          standard: tokenData?.standard,
        });
        const amount = getAssetAmount(
          { decodedArguments, methodName },
          tokenInfo.token.standard
        );
        const media = isICP(canisterId)
          ? {
              icon: TOKENS.ICP.icon,
            }
          : {
              imageUrl: tokenInfo.token.logo,
            };

        setToken({
          ...media,
          amount: amount,
          symbol: tokenInfo.token.symbol!,
          usdValue:
            formatAssetBySymbol(
              amount.toString(),
              tokenInfo.token.symbol,
              icpPrice
            ).value || null,
        });
      }
    };
    getInfo();
  }, []);

  return (
    <>
      {isTransfer ? (
        isLoadingTransfer ? (
          <ActivityIndicator size="large" color="white" />
        ) : token ? (
          <>
            <TransferItem unknown={shouldWarn || unknown} token={token} />
            {shouldWarn && (
              <View style={styles.warningContainer}>
                <View style={styles.unknownContainer}>
                  <WarningIcon style={styles.warningIcon} />
                  <Text style={[FontStyles.Normal, styles.unknownTitle]}>
                    {t('walletConnect.unknownArguments')}
                  </Text>
                </View>
                <Text
                  onPress={goToLearnMore}
                  style={[FontStyles.Normal, styles.learnMore]}>
                  {t('common.learnMore')}
                </Text>
              </View>
            )}
          </>
        ) : (
          nftId && (
            <ActionItem
              title={formattedMethodName}
              subtitle={nftId}
              iconUrl={canisterInfo.icon}
            />
          )
        )
      ) : (
        <ActionItem
          title={formattedMethodName}
          subtitle={canisterId}
          iconUrl={canisterInfo.icon}
        />
      )}
    </>
  );
}

export default RequestCall;
