import React from 'react';
import { Text, View } from 'react-native';

import UserIcon from '@/components/common/UserIcon';
import { FontStyles } from '@/constants/theme';
import { Wallet } from '@/interfaces/redux';

import styles from './styles';

interface Props {
  currentWallet: Wallet;
}

function UserShowcase({ currentWallet }: Props) {
  return (
    <View style={styles.userContainer}>
      <UserIcon icon={currentWallet?.icon} size="small" />
      <Text style={[FontStyles.Normal, styles.user]}>
        {currentWallet?.icnsData?.reverseResolvedName || currentWallet?.name}
      </Text>
    </View>
  );
}

export default UserShowcase;
