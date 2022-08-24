import { t } from 'i18next';
import React from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { getTokenPrices } from '@/constants/assets';
import { TRUST_AND_SECURITY_URL } from '@/constants/general';
import { FontStyles } from '@/constants/theme';
import { State } from '@/interfaces/redux';
import {
  WallectConnectFlowsData,
  WCWhiteListItem,
} from '@/interfaces/walletConnect';
import { getUsdAvailableAmount } from '@/screens/flows/Send/utils';

import warningIcon from '../../assets/warningIcon.png';
import {
  getAssetAmount,
  getAssetData,
  TRANSFER_METHOD_NAMES,
} from '../../utils';
import ActionItem from '../ActionItem';
import TransferItem from '../TransferItem';
import styles from './styles';

interface Props extends WallectConnectFlowsData {
  canisterInfo: WCWhiteListItem;
}

function RequestCall(props: Props) {
  const { shouldWarn, canisterId, methodName, decodedArguments } = props.args;
  const canisterInfo = props.canisterInfo;
  const goToLearnMore = () => Linking.openURL(TRUST_AND_SECURITY_URL);

  const { icpPrice } = useSelector((state: State) => state.icp);
  const isTransfer = TRANSFER_METHOD_NAMES.includes(methodName);

  // TODO: Handle TransferNFT case. Create a getData to get the data from every possible case.
  let token = null;
  if (isTransfer) {
    const assetData = getAssetData(canisterId);
    const amount = getAssetAmount(
      { decodedArguments, methodName },
      assetData?.standard
    );
    token = {
      icon: assetData?.icon!,
      amount: amount,
      symbol: assetData?.symbol!,
      usdValue: getUsdAvailableAmount(
        amount,
        getTokenPrices(assetData?.symbol!, icpPrice)
      ),
    };
  }
  return (
    <>
      {shouldWarn ? (
        <>
          <TransferItem unknown token={token!} />
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
        </>
      ) : isTransfer ? (
        <TransferItem token={token!} />
      ) : (
        <ActionItem
          title={methodName}
          subtitle={canisterId}
          iconUrl={canisterInfo.icon}
        />
      )}
    </>
  );
}

export default RequestCall;
