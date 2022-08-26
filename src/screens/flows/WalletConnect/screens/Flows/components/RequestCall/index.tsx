import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Linking, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getTokenPrices } from '@/constants/assets';
import { TRUST_AND_SECURITY_URL } from '@/constants/general';
import { FontStyles } from '@/constants/theme';
import { Nullable } from '@/interfaces/general';
import { State } from '@/interfaces/redux';
import {
  WallectConnectFlowsData,
  WCWhiteListItem,
} from '@/interfaces/walletConnect';
import { getUsdAvailableAmount } from '@/screens/flows/Send/utils';
import { addSpacesAndCapitalize } from '@/utils/strings';
//TODO: Import getDabNfts from /services/DAB.ts after 0.2.0 merge
import { getDabNfts } from '@/utils/walletConnect';

// TODO: Pass this .png to .svg after 0.2.0 merge
import warningIcon from '../../assets/warningIcon.png';
import {
  getAssetAmount,
  getAssetData,
  getNFTId,
  TRANSFER_METHOD_NAMES,
} from '../../utils';
import ActionItem from '../ActionItem';
import TransferItem from '../TransferItem';
import styles from './styles';

export interface TransferToken {
  icon: string;
  amount: number | string;
  symbol: string;
  usdValue: number | string;
}
interface Props extends WallectConnectFlowsData {
  canisterInfo: WCWhiteListItem;
}

function RequestCall(props: Props) {
  const canisterInfo = props.canisterInfo;
  const { shouldWarn, canisterId, methodName, decodedArguments } = props.args;
  const { icpPrice } = useSelector((state: State) => state.icp);
  const formattedMethodName = addSpacesAndCapitalize(methodName);
  const [token, setToken] = useState<Nullable<TransferToken>>(null);
  const [nftId, setNFTId] = useState<Nullable<string>>(null);
  const isTransfer = TRANSFER_METHOD_NAMES.includes(methodName);
  const isLoadingTransfer = isTransfer && !token && !nftId;
  const assetData = getAssetData(canisterId);

  const goToLearnMore = () => Linking.openURL(TRUST_AND_SECURITY_URL);

  const getNFTCanisters = async () => {
    const canisters = await getDabNfts();
    const ids = canisters?.map(canister => `${canister?.principal_id}`);
    return ids;
  };

  useEffect(() => {
    if (isTransfer) {
      getNFTCanisters().then(ids => {
        if (!assetData && ids.includes(canisterId)) {
          // Is NFT-Transfer
          setNFTId(getNFTId({ methodName, decodedArguments }));
        } else if (assetData) {
          // Is TOKEN-Transfer
          const amount = getAssetAmount(
            { decodedArguments, methodName },
            assetData.standard
          );
          setToken({
            icon: assetData?.icon!,
            amount: amount,
            symbol: assetData?.symbol!,
            usdValue: getUsdAvailableAmount(
              amount,
              getTokenPrices(assetData?.symbol!, icpPrice)
            ),
          });
        }
      });
    }
  }, []);

  return (
    <>
      {isTransfer ? (
        isLoadingTransfer ? (
          <ActivityIndicator size="large" color="white" />
        ) : token ? (
          <>
            <TransferItem unknown={shouldWarn} token={token} />
            {shouldWarn && (
              <View style={styles.warningContainer}>
                <View style={styles.unknownContainer}>
                  <Image source={warningIcon} style={styles.warningIcon} />
                  <Text style={[FontStyles.Normal, styles.unknownTitle]}>
                    {t('walletConnect.unknownArguments')}
                  </Text>
                </View>
                <Text
                  onPress={goToLearnMore}
                  style={[FontStyles.Normal, styles.learnMore]}>
                  {t('walletConnect.learnMore')}
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
