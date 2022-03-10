import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Clipboard from '@react-native-community/clipboard';

import Touchable from '../../animations/Touchable';
import CopiedToast from '../CopiedToast';
import Icon from '../../icons';
import styles from './styles';

const Copy = ({ text, customStyle }) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    return () => setVisibility(false);
  }, []);

  const copyToClipboard = () => {
    setVisibility(true);
    Clipboard.setString(text);
  };

  return (
    <Touchable onPress={copyToClipboard}>
      <View style={[styles.container, customStyle]}>
        <CopiedToast
          visibility={visibility}
          setVisibility={setVisibility}
          customStyle={styles.toastStyle}
          customPointerStyle={styles.toastPointerStyle}
        />
        <Icon name="copy" />
        <Text style={styles.text}>Copy to clipboard</Text>
      </View>
    </Touchable>
  );
};

export default Copy;
