import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RainbowButton from '../../components/buttons/RainbowButton';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/il_white_plug.png';
import Button from '../../components/buttons/Button';
import { FontStyles } from '../../constants/theme';
import Routes from '../../navigation/Routes';
import styles from './styles';

function Welcome() {
  const navigation = useNavigation();
  const { isInitialized } = useSelector(state => state.keyring);

  const onPress = flow => () =>
    navigation.navigate(Routes.CREATE_PASSWORD, {
      flow,
    });

  const handleBack = () => {
    navigation.navigate(Routes.LOGIN_SCREEN);
  };

  const title = isInitialized ? 'Choose an option' : 'Welcome to Plug';
  const importTitle = `Import${isInitialized ? ' New ' : ' '}Wallet`;
  const createTitle = `Create${isInitialized ? ' New ' : ' '}Wallet`;

  return (
    <Container>
      {isInitialized && (
        <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
          Back
        </Text>
      )}
      <View style={styles.container}>
        <Image source={Plug} style={styles.plugIcon} />
        <Text style={styles.title}>{title}</Text>
        <RainbowButton
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text={createTitle}
          onPress={onPress('create')}
        />
        <Button
          buttonStyle={[styles.buttonMargin, styles.buttonStyling]}
          text={importTitle}
          onPress={onPress('import')}
        />
      </View>
    </Container>
  );
}

export default Welcome;
