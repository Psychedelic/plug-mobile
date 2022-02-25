import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RainbowButton from '../../components/buttons/RainbowButton';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/plug-white.png';
import Button from '../../components/buttons/Button';
import { FontStyles } from '../../constants/theme';
import Routes from '../../navigation/Routes';
import styles from './styles';

import { NativeModules } from 'react-native';

const { SigningBridge } = NativeModules;

function Welcome() {
  const navigation = useNavigation();
  const { isInitialized } = useSelector(state => state.keyring);
  const [signedData, setSignedData] = useState('');

  const onPress = flow => () =>
    navigation.navigate(Routes.CREATE_PASSWORD, {
      flow,
    });

  const handleBack = () => {
    navigation.navigate(Routes.LOGIN_SCREEN);
  };

  const signData = () => {
    var data = SigningBridge.signData(
      '{"request_id":[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],"cert":{"tree":[0],"signature":[],"delegation":null}}',
    );
    console.log(`response ${data}`);
    // setSignedData(data);
  };

  const demoInterchange = () => {
    var data = SigningBridge.interchangeDemo('[DEMO_DATA]');
    console.log(`response ${data}`);
    setSignedData(data);
  };

  return (
    <Container>
      {isInitialized && (
        <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
          Back
        </Text>
      )}
      <View style={styles.container}>
        <Image source={Plug} />
        <Text style={styles.title}>Welcome to Plug</Text>
        <RainbowButton
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text="Create Wallet"
          onPress={onPress('create')}
        />
        <Button
          buttonStyle={[styles.buttonMargin, styles.buttonStyling]}
          text="Import Wallet"
          onPress={onPress('import')}
        />
        <Button
          buttonStyle={[styles.buttonMargin, styles.buttonStyling]}
          text="Sign Data"
          onPress={() => demoInterchange()}
        />
        <Text style={styles.title}>{signedData}</Text>
      </View>
    </Container>
  );
}

export default Welcome;
