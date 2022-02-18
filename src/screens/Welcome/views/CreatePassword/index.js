import { Text, View, Image, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RainbowButton from '../../../../components/buttons/RainbowButton';
import PasswordInput from '../../../../components/common/PasswordInput';
import KeyboardHider from '../../../../components/common/KeyboardHider';
import { reset, createWallet } from '../../../../redux/slices/keyring';
import PlugLogo from '../../../../assets/icons/plug-logo-full.png';
import { isValidPassword } from '../../../../constants/general';
import Container from '../../../../components/common/Container';
import Header from '../../../../components/common/Header';
import useKeychain from '../../../../hooks/useKeychain';
import Back from '../../../../components/common/Back';
import Routes from '../../../../navigation/Routes';
import styles from './styles';

const CreatePassword = ({ route, navigation }) => {
  const { isSensorAvailable, saveBiometrics } = useKeychain();
  const dispatch = useDispatch();

  const { icpPrice } = useSelector(state => state.icp);
  const { flow } = route.params;
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
    return () => setLoading(false);
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
        dispatch(reset());
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
    <KeyboardHider>
      <Container>
        <Header
          left={<Back onPress={() => goBack()} />}
          center={
            <View style={styles.plugLogoContainer}>
              <Image style={styles.plugLogo} source={PlugLogo} />
            </View>
          }
        />
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
              <Text style={styles.faceId}>Sign in with Face ID?</Text>
              <Switch onValueChange={toggleSwitch} value={biometrics} />
            </View>
          )}
          <RainbowButton
            text="Continue"
            loading={loading}
            onPress={handleCreate}
            buttonStyle={styles.rainbowButton}
            disabled={isValidPassword(password) || loading}
          />
        </View>
      </Container>
    </KeyboardHider>
  );
};

export default CreatePassword;
