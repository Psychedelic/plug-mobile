import React from 'react';
import { View, Text } from 'react-native';

import { FontStyles } from '../../../constants/theme';
import { getErrorStateData } from './constants';
import Button from '../../buttons/Button';
import styles from './styles';

function ErrorState({ errorType, onPress, loading }) {
  const { title, emoji, description, buttonTitle } =
    getErrorStateData(errorType);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={FontStyles.Normal}>{title}</Text>
      <Text style={[FontStyles.SmallGray, styles.description]}>
        {description}
      </Text>
      <Button
        variant="gray"
        onPress={onPress}
        text={buttonTitle}
        loading={loading}
        buttonStyle={styles.button}
      />
    </View>
  );
}

export default ErrorState;
