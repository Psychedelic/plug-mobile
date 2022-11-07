import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Button from '@/buttons/Button';
import { FontStyles } from '@/constants/theme';

import Text from '../Text';
import { getErrorStateData } from './constants';
import styles from './styles';

interface Props {
  errorType: string;
  onPress?: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

function ErrorState({
  errorType,
  onPress,
  loading,
  style,
  buttonStyle,
}: Props) {
  const { title, emoji, description, buttonTitle } =
    getErrorStateData(errorType) || {};

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={FontStyles.Normal}>{title}</Text>
      <Text style={[FontStyles.SmallGray, styles.description]}>
        {description}
      </Text>
      {onPress && (
        <Button
          onPress={onPress}
          loading={loading}
          text={buttonTitle || ''}
          buttonStyle={[styles.button, buttonStyle]}
        />
      )}
    </View>
  );
}

export default ErrorState;
