import { t } from 'i18next';
import React from 'react';
import { Text, View } from 'react-native';

import { Image } from '@/components/common';
import IncognitoLogo from '@/components/icons/svg/Incognito.svg';
import { FontStyles } from '@/constants/theme';
import { FlowsRequest, WCFlowTypes } from '@/interfaces/walletConnect';

import styles, { unknownLogoColor } from './styles';

interface Props {
  request: FlowsRequest;
  type: WCFlowTypes;
}

const getSubtitle = (type: WCFlowTypes) => {
  switch (type) {
    case WCFlowTypes.requestCall:
    case WCFlowTypes.transfer:
      return t('walletConnect.actionsPermission.one');
    case WCFlowTypes.batchTransactions:
      return t('walletConnect.actionsPermission.several');
    default:
      return t('walletConnect.cannisterPermission');
  }
};

function WCFlowDappInfo({ request, type }: Props) {
  const dappImage = request?.args[0]?.icons[0];

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLogo}>
        {dappImage ? (
          <Image style={styles.logo} url={dappImage} />
        ) : (
          <IncognitoLogo
            height={40}
            width={40}
            fill={unknownLogoColor}
            style={styles.unknownLogo}
          />
        )}
      </View>
      <Text style={[FontStyles.Title, styles.dappName]}>
        {request?.dappName || t('walletConnect.unsafeDappName')}
      </Text>
      <Text style={[FontStyles.NormalGray, styles.subtitle]}>
        {getSubtitle(type)}
      </Text>
    </View>
  );
}

export default WCFlowDappInfo;
