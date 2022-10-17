import React from 'react';
import { View } from 'react-native';

import Touchable from '@/commonComponents/Touchable';
import Text from '@/components/common/Text';

import styles from './styles';

interface Props {
  name: string;
  onPress: () => void;
  destructive?: boolean;
}

function InfoItem({ name, onPress, destructive }: Props) {
  return (
    <Touchable
      onPress={onPress}
      hapticType={destructive ? 'notificationWarning' : undefined}>
      <View style={styles.container}>
        <Text type="normal" style={destructive && styles.destructive}>
          {name}
        </Text>
      </View>
    </Touchable>
  );
}

export default InfoItem;
