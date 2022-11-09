import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import RainbowButton from '@/components/buttons/RainbowButton';

import Text from '../Text';
import styles from './styles';

interface Props {
  title: string;
  text: string;
  emoji?: string;
  style?: StyleProp<ViewStyle>;
  buttonTitle?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  onTextPress?: () => void;
  onButtonPress?: () => void;
}

function EmptyState({
  title,
  text,
  style,
  emoji = '🤔',
  buttonTitle,
  buttonStyle,
  onTextPress,
  onButtonPress,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text type="body2" style={styles.title}>
        {title}
      </Text>
      <Text
        type="caption"
        style={[styles.text, onTextPress && styles.link]}
        onPress={onTextPress}>
        {text}
      </Text>
      {onButtonPress && buttonTitle && (
        <RainbowButton
          text={buttonTitle}
          onPress={onButtonPress}
          buttonStyle={buttonStyle}
        />
      )}
    </View>
  );
}

export default EmptyState;
