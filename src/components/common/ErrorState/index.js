import React from 'react';
import { View, Text } from 'react-native';

import { FontStyles } from '@constants/theme';
import Button from '@buttons/Button';

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
