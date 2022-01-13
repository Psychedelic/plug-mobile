import { Text, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import KeyboardHider from '../../../../components/common/KeyboardHider';
import { reset, importWallet } from '../../../../redux/slices/keyring';
import PlugLogo from '../../../../assets/icons/plug-logo-full.png';
import Container from '../../../../components/common/Container';
import TextInput from '../../../../components/common/TextInput';
import { useICPPrice } from '../../../../redux/slices/icp';
import Header from '../../../../components/common/Header';
import Back from '../../../../components/common/Back';
import useKeyring from '../../../../hooks/useKeyring';
import { Colors } from '../../../../constants/theme';
import Routes from '../../../../navigation/Routes';
import styles from './styles';

const ImportSeedPhrase = ({ navigation, route }) => {
  const icpPrice = useICPPrice();
  const { saveBiometrics } = useKeyring();
  const { goBack } = navigation;
  const { password, shouldSaveBiometrics } = route?.params || {};
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onPress = async () => {
    try {
      setLoading(true);
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
            value={seedPhrase}
            variant="multi"
            onChangeText={onChangeText}
            placeholder="Secret Recovery Phrase"
            customStyle={{
              backgroundColor: Colors.Gray.Secondary,
              marginTop: 30,
              marginBottom: 30,
            }}
            multiline
          />

          <RainbowButton
            text="Continue"
            onPress={onPress}
            loading={loading}
            disabled={!isMnemonicValid}
          />
        </View>
      </Container>
    </KeyboardHider>
  );
};

export default ImportSeedPhrase;
