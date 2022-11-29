import Clipboard from '@react-native-clipboard/clipboard';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { CopiedToast, Text, Touchable } from '@/components/common';
import { FontStyles } from '@/constants/theme';
import { useAppSelector } from '@/redux/hooks';
import shortAddress from '@/utils/shortAddress';

import styles from './styles';

const AccountInfo = () => {
  const [visibility, setVisibility] = useState(false);
  const { currentWallet } = useAppSelector(state => state.keyring);
  const reverseResolvedName = useAppSelector(
    state => state.keyring.currentWallet?.icnsData?.reverseResolvedName
  );
  const { principal, name } = currentWallet || {};

  useEffect(() => {
    return () => setVisibility(false);
  }, []);

  const copyToClipboard = async () => {
    Clipboard.setString(principal!);
    setVisibility(true);
  };

  return (
    <>
      <Touchable onPress={copyToClipboard}>
        <View style={styles.container}>
          <Text type="normal">{reverseResolvedName || name}</Text>
          <Text style={FontStyles.SmallGray}>{shortAddress(principal)}</Text>
        </View>
      </Touchable>
      <CopiedToast
        visibility={visibility}
        setVisibility={setVisibility}
        customStyle={styles.toastStyle}
        customPointerStyle={styles.toastPointerStyle}
      />
    </>
  );
};

export default AccountInfo;
