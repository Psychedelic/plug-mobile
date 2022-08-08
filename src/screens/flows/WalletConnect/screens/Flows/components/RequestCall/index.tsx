import { t } from 'i18next';
import React from 'react';
import { Image, Linking, Text, View } from 'react-native';

import { TRUST_AND_SECURITY_URL } from '@/constants/general';
import { FontStyles } from '@/constants/theme';
import { WallectConnectFlowsData } from '@/interfaces/walletConnect';

import warningIcon from '../../assets/warningIcon.png';
import TransferItem from '../TransferItem';
import styles from './styles';

// import RequestTransfer from '../RequestTransfer';

function RequestCall(props: WallectConnectFlowsData) {
  const { shouldWarn } = props.args;
  const goToLearnMore = () => Linking.openURL(TRUST_AND_SECURITY_URL);

  return (
    <>
      {shouldWarn ? (
        <>
          <TransferItem unknown />
          <View style={styles.warningContainer}>
            <View style={styles.unknownContainer}>
              <Image source={warningIcon} style={styles.warningIcon} />
              <Text style={[FontStyles.Normal, styles.unknownTitle]}>
                {t('walletConnect.unknown')}
              </Text>
            </View>
            <Text
              onPress={goToLearnMore}
              style={[FontStyles.Normal, styles.learnMore]}>
              {t('walletConnect.learnMore')}
            </Text>
          </View>
        </>
      ) : (
        <Text>Safe request-call</Text>
      )}
    </>
  );
}

export default RequestCall;
