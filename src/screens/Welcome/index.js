import React from 'react';
import Plug from '../../assets/icons/plug-white.png';
import { View, Text, Image } from 'react-native';
import Button from '../../components/buttons/Button';
import RainbowButton from '../../components/buttons/RainbowButton';
import Container from '../../components/common/Container';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../navigation/Routes';
import styles from './styles';

function Welcome() {
  const navigation = useNavigation();

  const onPress = flow => () =>
    navigation.navigate(Routes.CREATE_PASSWORD, {
      flow,
    });

  return (
    <Container>
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
      </View>
    </Container>
  );
}

export default Welcome;
