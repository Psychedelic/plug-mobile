import { t } from 'i18next';
import React from 'react';
import { View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Colors } from '@/constants/theme';

import styles from './styles';

interface Props {
  isBatchTransactions: boolean;
  onPressCancel: () => void;
  onPressSend: () => void;
  sendLoading: boolean;
}

function WCFlowBottomContainer({
  isBatchTransactions,
  onPressCancel,
  onPressSend,
  sendLoading,
}: Props) {
  return (
    <View style={styles.bottomContainer}>
      <LinearGradient
        colors={[Colors.Transparent, Colors.Black.Primary]}
        style={styles.gradient}
      />
      <View style={styles.buttonContainer}>
        <Button
          text={t('walletConnect.decline')}
          buttonStyle={styles.buttonStyle}
          onPress={onPressCancel}
        />
        <RainbowButton
          loading={sendLoading}
          text={
            isBatchTransactions
              ? t('walletConnect.confirm')
              : t('walletConnect.allow')
          }
          buttonStyle={styles.buttonStyle as ViewStyle}
          onPress={onPressSend}
        />
      </View>
    </View>
  );
}

export default WCFlowBottomContainer;
