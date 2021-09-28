import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Icon from '../../icons';
import styles from './styles';

const Copy = ({ text, customStyle }) => {
  const copyToClipboard = () => {
    console.log(text)
    Clipboard.setString(text);
  }

  return (
    <TouchableOpacity onPress={copyToClipboard} style={[styles.container, customStyle]}>
      <Icon name='copy' />
      <Text style={styles.text}>Copy to clipboard</Text>
    </TouchableOpacity>
  )
}

export default Copy;
