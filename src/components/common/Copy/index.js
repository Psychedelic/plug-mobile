import Clipboard from '@react-native-community/clipboard';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import CopiedToast from '@commonComponents/CopiedToast';
import Touchable from '@commonComponents/Touchable';
import Icon from '@icons';

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
