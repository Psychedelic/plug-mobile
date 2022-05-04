import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RainbowButton from '@components/buttons/RainbowButton';
import KeyboardHider from '@commonComponents/KeyboardHider';
import { reset, importWallet } from '@redux/slices/keyring';
import PlugLogo from '@assets/icons/plug-logo-full.png';
import TextInput from '@commonComponents/TextInput';
import { getICPPrice } from '@redux/slices/icp';
import Header from '@commonComponents/Header';
import useKeychain from '@hooks/useKeychain';
import Back from '@commonComponents/Back';
import Routes from '@navigation/Routes';
import { Container } from '@layout';

import styles from './styles';

const ImportSeedPhrase = ({ navigation, route }) => {
  const { goBack } = navigation;
  const dispatch = useDispatch();
  const { saveBiometrics } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { password, shouldSaveBiometrics } = route?.params || {};

  const [error, setError] = useState(false);
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
      dispatch(
        importWallet({
          icpPrice,
          mnemonic: seedPhrase,
          password,
          onError: () => {
            setError(true);
            setLoading(false);
          },
          onSuccess: async () => {
            if (shouldSaveBiometrics) {
              await saveBiometrics(password);
            }
            setLoading(false);
            setError(false);
            navigation.navigate(Routes.SWIPE_LAYOUT);
          },
        }),
      );
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
    <Container>
      <Header
        left={<Back onPress={goBack} />}
        center={
          <View style={styles.plugLogoContainer}>
            <Image style={styles.plugLogo} source={PlugLogo} />
          </View>
        }
      />
      <KeyboardHider>
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
            customStyle={styles.input}
          />
          {error && (
            <Text style={styles.errorText}>Recovery phrase not found</Text>
          )}
          <RainbowButton
            text="Continue"
            onPress={onPress}
            loading={loading}
            buttonStyle={styles.button}
            disabled={!isMnemonicValid || loading}
          />
        </View>
      </KeyboardHider>
    </Container>
  );
};

export default ImportSeedPhrase;
