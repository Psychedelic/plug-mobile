import { t } from 'i18next';
import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import TokenFormat from '@/components/formatters/TokenFormat';
import { FontStyles } from '@/constants/theme';
import { State } from '@/interfaces/redux';

import UserShowcase from '../UserShowcase';
import styles from './styles';

interface Props {
  canisterId: string;
}

function RequestTransferHeader(props: Props) {
  const { currentWallet } = useSelector((state: State) => state.keyring);
  const { assets } = useSelector((state: State) => state.user);
  const token = assets.find(
    ({ canisterId }) => canisterId === props.canisterId
  );

  return token ? (
    <View style={styles.infoUserHeader}>
      <View style={styles.leftContainer}>
        <Text style={[FontStyles.NormalGray, styles.topTitle]}>
          {t('walletConnect.wallet')}
        </Text>
        <UserShowcase currentWallet={currentWallet} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={FontStyles.NormalGray}>{t('walletConnect.balance')}</Text>
        <TokenFormat
          value={token.amount}
          token={token.symbol}
          style={FontStyles.Normal}
        />
      </View>
    </View>
  ) : null;
}

export default RequestTransferHeader;