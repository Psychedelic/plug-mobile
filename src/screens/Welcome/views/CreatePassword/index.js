import React, { useState, useEffect } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import Container from '../../../../components/common/Container';
import TextInput from '../../../../components/common/TextInput';
import { Colors } from '../../../../constants/theme';
import RainbowButton from '../../../../components/buttons/RainbowButton';
import Header from '../../../../components/common/Header';
import PlugLogo from '../../../../assets/icons/plug-logo-full.png';
import Back from '../../../../components/common/Back';
import useKeyring from '../../../../hooks/useKeyring';
import styles from './styles';
import Routes from '../../../../navigation/Routes';
import { useDispatch } from 'react-redux';
import { reset, createWallet } from '../../../../redux/slices/keyring';
import KeyboardHider from '../../../../components/common/KeyboardHider';
import Keychain from '../../../../modules/keychain';

const CreatePassword = ({ route, navigation }) => {
  const { saveBiometrics } = useKeyring();
  const { flow } = route.params;
  const { goBack } = navigation;
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [biometrics, setBiometrics] = useState(false);
  const [biometryAvailable, setBiometryAvailable] = useState(false);
  const toggleSwitch = () => setBiometrics(previousState => !previousState);

  useEffect(() => {
    Keychain.isSensorAvailable().then(isAvailable => {
      setBiometryAvailable(isAvailable);
    });
  }, []);

  const handleCreate = async () => {
    if (flow === 'import') {
      const shouldSaveBiometrics = biometryAvailable && biometrics;
      navigation.navigate(Routes.IMPORT_SEED_PHRASE, {
        password,
        shouldSaveBiometrics,
      });
    } else {
      try {
        setLoading(true);
        dispatch(reset());
        dispatch(createWallet(password))
          .unwrap()
          .then(async result => {
            if (result?.mnemonic) {
              if (biometryAvailable && biometrics) {
                await saveBiometrics(password);
              }
              navigation.navigate(Routes.BACKUP_SEED_PHRASE, {
                mnemonic: result.mnemonic,
              });
            }
          });
      } catch (e) {
        console.log('Error:', e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardHider>
      <Container>
        <Header
          left={<Back onPress={() => goBack()} />}
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
          <Text style={styles.title}>Create Password</Text>
          <Text style={styles.subtitle}>
            Please create a secure password that you will remember.
          </Text>
          <TextInput
            value={password}
            variant="password"
            onChangeText={setPassword}
            placeholder="Password"
            customStyle={{
              backgroundColor: Colors.Gray.Secondary,
              marginTop: 28,
            }}
          />
          <TextInput
            value={confirmPassword}
            variant="password"
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            customStyle={{
              backgroundColor: Colors.Gray.Secondary,
              marginTop: 22,
            }}
          />
          <Text style={styles.help}>Must be at least 12 characters</Text>
          {biometryAvailable && (
            <View style={styles.switchContainer}>
              <Text style={styles.faceId}>Sign in with Face ID?</Text>
              <Switch onValueChange={toggleSwitch} value={biometrics} />
            </View>
          )}
          <RainbowButton
            buttonStyle={styles.rainbowButton}
            text="Continue"
            loading={loading}
            onPress={handleCreate}
            disabled={
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              password.length < 12
            }
          />
        </View>
      </Container>
    </KeyboardHider>
  );
};

export default CreatePassword;
