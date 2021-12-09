import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, StatusBar, Text, Image } from 'react-native';
import Plug from '../../assets/icons/plug-white.png';
import Container from '../../components/common/Container';
import RainbowButton from '../../components/buttons/RainbowButton';
import Button from '../../components/buttons/Button';
import TextInput from '../../components/common/TextInput';
import Routes from '../../navigation/Routes';
import styles from './styles';
import KeyboardHider from '../../components/common/KeyboardHider';
import { unlock, setAssetsLoading } from '../../redux/slices/keyring';
import { useDispatch, useSelector } from 'react-redux';
import { useICPPrice } from '../../redux/slices/icp';

function Login() {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const icpPrice = useICPPrice();

  const { assetsLoading } = useSelector((state) => state.keyring);

  const clearState = () => {
    setPassword('');
    setError(false);
  };

  const handleImport = () => {
    clearState();
    navigation.navigate(Routes.CREATE_IMPORT_LAYOUT);
  };

  const handleSubmit = async () => {
    dispatch(setAssetsLoading(true));
    dispatch(unlock({ password, icpPrice }))
      .unwrap()
      .then((result) => {
        console.log('resss', result);
        if (result.unlocked) {
          clearState();
          navigation.navigate(Routes.SWIPE_LAYOUT);
        } else {
          setError(true);
        }
      })
  };

  return (
    <KeyboardHider>
      <Container>
        <View style={styles.container}>
          <Image source={Plug} />
          <Text style={styles.title}>Unlock Plug</Text>
          <StatusBar barStyle="dark-content" />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter password"
            variant="password"
            autoFocus
          />
          {error && (
            <Text style={styles.errorText}>The password is incorrect</Text>
          )}
          <RainbowButton
            text="Submit"
            onPress={handleSubmit}
            loading={assetsLoading}
            buttonStyle={styles.buttonMargin}
          />
          <Button
            text="Import new Account"
            onPress={handleImport}
            buttonStyle={styles.buttonMargin}
          />
        </View>
      </Container>
    </KeyboardHider>
  );
}

export default Login;
