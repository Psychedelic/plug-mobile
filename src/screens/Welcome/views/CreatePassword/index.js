import { Text, View, Image, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import RainbowButton from '@components/buttons/RainbowButton';
import PasswordInput from '@commonComponents/PasswordInput';
import KeyboardHider from '@commonComponents/KeyboardHider';
import PlugLogo from '@assets/icons/plug-logo-full.png';
import { isValidNewPassword } from '@constants/general';
import { createWallet } from '@redux/slices/keyring';
import Container from '@commonComponents/Container';
import Header from '@commonComponents/Header';
import useKeychain from '@hooks/useKeychain';
import Back from '@commonComponents/Back';
import Routes from '@navigation/Routes';

import styles from './styles';

const CreatePassword = ({ route, navigation }) => {
  const { isSensorAvailable, saveBiometrics } = useKeychain();
  const dispatch = useDispatch();

  const { icpPrice } = useSelector(state => state.icp);
  const flow = route.params?.flow;
  const { goBack } = navigation;
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [biometrics, setBiometrics] = useState(false);
  const [biometryAvailable, setBiometryAvailable] = useState(false);

  const toggleSwitch = () => setBiometrics(previousState => !previousState);

  useEffect(() => {
    isSensorAvailable().then(isAvailable => {
      setBiometryAvailable(isAvailable);
    });
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    if (flow === 'import') {
      const shouldSaveBiometrics = biometryAvailable && biometrics;
      navigation.navigate(Routes.IMPORT_SEED_PHRASE, {
        password,
        shouldSaveBiometrics,
      });
      setLoading(false);
    } else {
      try {
        dispatch(createWallet({ password, icpPrice }))
          .unwrap()
          .then(async result => {
            if (result?.mnemonic) {
              if (biometryAvailable && biometrics) {
                await saveBiometrics(password);
              }
              navigation.navigate(Routes.BACKUP_SEED_PHRASE, {
                mnemonic: result.mnemonic,
              });
              setLoading(false);
            }
          });
      } catch (e) {
        console.log('Error:', e);
      }
    }
  };

  return (
    <Container>
      <Header
        left={<Back onPress={() => goBack()} />}
        center={
          <View style={styles.plugLogoContainer}>
            <Image style={styles.plugLogo} source={PlugLogo} />
          </View>
        }
      />
      <KeyboardHider>
        <View style={styles.container}>
          <Text style={styles.title}>Create Password</Text>
          <Text style={styles.subtitle}>
            Please create a secure password that you will remember.
          </Text>
          <PasswordInput
            password={password}
            onChange={setPassword}
            customStyle={styles.passwordInput}
          />
          <Text style={styles.help}>Must be at least 12 characters</Text>
          {biometryAvailable && (
            <View style={styles.switchContainer}>
              <Text style={styles.faceId}>Sign in with biometrics?</Text>
              <Switch onValueChange={toggleSwitch} value={biometrics} />
            </View>
          )}
          <RainbowButton
            text="Continue"
            loading={loading}
            onPress={handleCreate}
            buttonStyle={styles.rainbowButton}
            disabled={isValidNewPassword(password) || loading}
          />
        </View>
      </KeyboardHider>
    </Container>
  );
};

export default CreatePassword;
