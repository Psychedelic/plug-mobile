import React from 'react';
import { Text, View } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Icon from '../../icons';
import styles from './styles';
import Touchable from '../../animations/Touchable';

const Copy = ({ text, customStyle }) => {
  const copyToClipboard = () => {
    Clipboard.setString(text);
  };

  return (
    <Touchable>
      <View onPress={copyToClipboard} style={[styles.container, customStyle]}>
        <Icon name="copy" />
        <Text style={styles.text}>Copy to clipboard</Text>
      </View>
    </Touchable>
  );
};

export default Copy;
