import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import ActionButton from '../ActionButton';
import Text from '../Text';
import styles from './styles';

interface Props {
  caption: string;
  left?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  actionLabel?: string;
  onActionPress?: () => void;
}

function Alert({ style, left, caption, actionLabel, onActionPress }: Props) {
  return (
    <View style={[styles.container, style]}>
      {left}
      <View style={styles.textContainer}>
        <Text type="caption" style={styles.caption} numberOfLines={2}>
          {caption}
        </Text>
        {actionLabel && onActionPress && (
          <ActionButton
            type="caption"
            label={actionLabel}
            onPress={onActionPress}
          />
        )}
      </View>
    </View>
  );
}

export default Alert;
