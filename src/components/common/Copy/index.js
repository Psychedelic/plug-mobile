import Clipboard from '@react-native-community/clipboard';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import CopiedToast from '@/commonComponents/CopiedToast';
import Touchable from '@/commonComponents/Touchable';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';

import Text from '../Text';
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
        <Icon name="copy" color={Colors.ActionBlue} />
        <Text style={styles.text}>{t('common.copyClipboard')}</Text>
      </View>
    </Touchable>
  );
};

export default Copy;
