import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import KeyboardHider from '../../../../components/common/KeyboardHider';
import { reset, importWallet } from '../../../../redux/slices/keyring';
import PlugLogo from '../../../../assets/icons/plug-logo-full.png';
import Container from '../../../../components/common/Container';
import TextInput from '../../../../components/common/TextInput';
import { getICPPrice } from '../../../../redux/slices/icp';
import Header from '../../../../components/common/Header';
import useKeychain from '../../../../hooks/useKeychain';
import Back from '../../../../components/common/Back';
import { Colors } from '../../../../constants/theme';
import Routes from '../../../../navigation/Routes';
import styles from './styles';

const ImportSeedPhrase = ({ navigation, route }) => {
  const { goBack } = navigation;
  const dispatch = useDispatch();
  const { saveBiometrics } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { password, shouldSaveBiometrics } = route?.params || {};

  const [loading, setLoading] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const onPress = async () => {
    setLoading(true);
    try {
      dispatch(reset());
      dispatch(importWallet({ icpPrice, mnemonic: seedPhrase, password }))
        .unwrap()
        .then(async () => {
          if (shouldSaveBiometrics) {
            await saveBiometrics(password);
          }
          setLoading(false);
          navigation.navigate(Routes.SWIPE_LAYOUT);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const isMnemonicValid =
    seedPhrase !== null &&
    seedPhrase.trim().split(/\s+/g).length === 12 &&
    !invalidSeedPhrase;

  const onChangeText = e => {
    setSeedPhrase(e);
    setInvalidSeedPhrase(false);
  };

  return (
    <KeyboardHider>
      <Container>
        <Header
          left={<Back onPress={goBack} />}
          center={
            <View style={{ width: 70, height: 33 }}>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'contain',
                }}
                source={PlugLogo}
              />
            </View>
          }
        />
        <View style={styles.container}>
          <Text style={styles.title}>Import Wallet</Text>
          <Text style={styles.subtitle}>
            Please enter your 12 word Secret Recovery Phrase.
          </Text>
          <TextInput
            multiline
            variant="multi"
            value={seedPhrase}
            onChangeText={onChangeText}
            placeholder="Secret Recovery Phrase"
            customStyle={{
              backgroundColor: Colors.Gray.Secondary,
              marginTop: 30,
              marginBottom: 30,
            }}
          />
          <RainbowButton
            text="Continue"
            onPress={onPress}
            loading={loading}
            disabled={!isMnemonicValid || loading}
          />
        </View>
      </Container>
    </KeyboardHider>
  );
};

export default ImportSeedPhrase;
