import Clipboard from '@react-native-community/clipboard';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import CopiedToast from '@/commonComponents/CopiedToast';
import Touchable from '@/commonComponents/Touchable';
import { FontStyles } from '@/constants/theme';
import shortAddress from '@/utils/shortAddress';

import Text from '../Text';
import styles from './styles';

const AccountInfo = () => {
  const [visibility, setVisibility] = useState(false);
  const { currentWallet } = useSelector(state => state.keyring);
  const { reverseResolvedName } =
    useSelector(state => state.keyring.currentWallet?.icnsData) || {};
  const { principal, name } = currentWallet || {};

  useEffect(() => {
    return () => setVisibility(false);
  }, []);

  const copyToClipboard = async () => {
    Clipboard.setString(principal);
    setVisibility(true);
  };

  return (
    <>
      <Touchable onPress={copyToClipboard}>
        <View style={styles.container}>
          <Text style={FontStyles.Normal}>{reverseResolvedName || name}</Text>
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
