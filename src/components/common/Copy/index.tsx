import Clipboard from '@react-native-clipboard/clipboard';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { CopiedToast, Text, Touchable } from '@/components/common';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';

import styles from './styles';

interface Props {
  text: string;
  customStyle?: StyleProp<ViewStyle>;
}

function Copy({ text, customStyle }: Props) {
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
        <Icon name="copy" color={Colors.ActionBlue} />
        <Text style={styles.text}>{t('common.copyClipboard')}</Text>
      </View>
    </Touchable>
  );
}

export default Copy;
