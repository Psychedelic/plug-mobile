import React from 'react';
import { View, SafeAreaView, StatusBar, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/auth';
import Button from '../../components/buttons/Button';
import RainbowButton from '../../components/buttons/RainbowButton';

import styles from './styles';

function Welcome() {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(login(true));
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Image source={require('../../assets/icons/plug-white.png')} />
        <Text style={styles.title}>Welcome to Plug</Text>
        <RainbowButton
          buttonStyle={styles.componentMargin}
          text="Create Wallet"
          onPress={onPress}
        />
        <Button
          buttonStyle={styles.componentMargin}
          text="Import Wallet"
          onPress={onPress}
        />
      </View>
    </SafeAreaView>
  );
}

export default Welcome;
