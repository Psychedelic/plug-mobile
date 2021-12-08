import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import Container from '../../../../components/common/Container';
import TextInput from '../../../../components/common/TextInput';
import { Colors } from '../../../../constants/theme';
import Routes from '../../../../navigation/Routes';
import RainbowButton from '../../../../components/buttons/RainbowButton';
import Header from '../../../../components/common/Header';
import PlugLogo from '../../../../assets/icons/plug-logo-full.png';
import Back from '../../../../components/common/Back';
import useKeyring from '../../../../hooks/useKeyring';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { reset } from '../../../../redux/slices/keyring';
import KeyboardHider from '../../../../components/common/KeyboardHider';

const ImportSeedPhrase = ({ navigation, route }) => {
  const { importWallet, saveBiometrics } = useKeyring();
  const { goBack } = navigation;
  const { password, biometryType } = route?.params || {};
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onPress = async () => {
    try {
      setLoading(true);
      dispatch(reset());
      await importWallet({ mnemonic: seedPhrase, password });
      await saveBiometrics(password, biometryType);
      navigation.navigate(Routes.SWIPE_LAYOUT);
    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
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
