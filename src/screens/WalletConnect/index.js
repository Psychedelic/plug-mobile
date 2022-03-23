import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RainbowButton from '../../components/buttons/RainbowButton';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/il_white_plug.png';
import { FontStyles } from '../../constants/theme';
import Routes from '../../navigation/Routes';
import styles from './styles';
import useDeepLink from '../../hooks/useDeepLink';

function WalletConnect() {
  const navigation = useNavigation();
  const { isInitialized } = useSelector(state => state.keyring);
  const { deepLink } = useDeepLink();

  const onPress = () => {
    console.log('Connecting To Wallet Connet ....', deepLink);
    navigation.navigate(Routes.SWIPE_LAYOUT);
  };

  const handleBack = () => {
    navigation.navigate(Routes.LOGIN_SCREEN);
  };

  return (
    <Container>
      {isInitialized && (
        <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
          Back
        </Text>
      )}
      <View style={styles.container}>
        <Image source={Plug} style={styles.plugIcon} />
        <Text style={styles.title}>Wallet Connect</Text>
        <RainbowButton
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text="Wallet Connect"
          onPress={onPress}
        />
      </View>
    </Container>
  );
}

export default WalletConnect;
