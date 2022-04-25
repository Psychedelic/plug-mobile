import Clipboard from '@react-native-community/clipboard';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import shortAddress from '@helpers/shortAddress';
import { FontStyles } from '@constants/theme';

import Touchable from '../../animations/Touchable';
import CopiedToast from '../CopiedToast';
import styles from './styles';

const AccountInfo = () => {
  const [visibility, setVisibility] = useState(false);
  const { currentWallet } = useSelector(state => state.keyring);
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
          <Text style={FontStyles.Normal}>{name}</Text>
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
