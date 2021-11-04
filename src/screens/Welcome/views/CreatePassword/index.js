import React, { useState, useEffect } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import Container from '../../../../components/common/Container';
import TextInput from '../../../../components/common/TextInput';
import { Colors } from '../../../../constants/theme';
import RainbowButton from '../../../../components/buttons/RainbowButton';
import Header from '../../../../components/common/Header';
import PlugLogo from '../../../../assets/icons/plug-logo-full.png';
import Back from '../../../../components/common/Back';
import * as Keychain from 'react-native-keychain';
import useKeyring from '../../../../hooks/useKeyring';
import styles from './styles';

const CreatePassword = ({ route, navigation }) => {
  const { createWallet } = useKeyring();
  const { navigateTo } = route.params;
  const { goBack } = navigation;
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [biometrics, setBiometrics] = useState(false);
  const [biometryType, setBiometryType] = useState(false);
  const toggleSwitch = () => setBiometrics(previousState => !previousState);

  useEffect(() => {
    setBiometryType(Keychain.getSupportedBiometryType());
  }, []);

  const handleCreate = async () => {
    /*
    try {
      const response = await createWallet({ password, biometryType });
      console.log('response', response)
    }
    catch (e) {
      console.log(e);
    }
    */

    navigation.navigate(navigateTo);
  };

  return (
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

        { biometryType && (
          <View style={styles.switchContainer}>
            <Text style={styles.faceId}>Sign in with Face ID?</Text>
            <Switch onValueChange={toggleSwitch} value={biometrics} />
          </View>
        )}
        <RainbowButton
          buttonStyle={styles.componentMargin}
          text="Continue"
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
  );
};

export default CreatePassword;
