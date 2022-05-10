import React from 'react';
import { Text, View } from 'react-native';

import Button from '@/buttons/Button';
import { FontStyles } from '@/constants/theme';

import { getErrorStateData } from './constants';
import styles from './styles';

function ErrorState({ errorType, onPress, loading, style, buttonStyle }) {
  const { title, emoji, description, buttonTitle, buttonImage } =
    getErrorStateData(errorType);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={FontStyles.Normal}>{title}</Text>
      <Text style={[FontStyles.SmallGray, styles.description]}>
        {description}
      </Text>
      {onPress && (
        <Button
          variant="gray"
          onPress={onPress}
          loading={loading}
          text={buttonTitle}
          iconName={buttonImage}
          buttonStyle={[styles.button, buttonStyle]}
        />
      )}
    </View>
  );
}

export default ErrorState;
