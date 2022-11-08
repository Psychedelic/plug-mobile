import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Button from '@/buttons/Button';
import { ERROR_TYPES } from '@/constants/general';
import { FontStyles } from '@/constants/theme';

import Text from '../Text';
import { ErrorStateData, getErrorStateData } from './constants';
import styles from './styles';

interface Props {
  errorType: ERROR_TYPES;
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
  const { title, emoji, description, buttonTitle } = getErrorStateData(
    errorType
  ) as ErrorStateData;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text type="normal">{title}</Text>
      <Text style={[FontStyles.SmallGray, styles.description]}>
        {description}
      </Text>
      {onPress && (
        <Button
          onPress={onPress}
          loading={loading}
          text={buttonTitle}
          buttonStyle={[styles.button, buttonStyle]}
        />
      )}
    </View>
  );
}

export default ErrorState;
