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

  const onCreatePress = () => navigation.navigate(Routes.CREATE_PASSWORD, {
    navigateTo: Routes.BACKUP_SEED_PHRASE,
  });
  const onImportPress = () => navigation.navigate(Routes.IMPORT_SEED_PHRASE);

  return (
    <Container>
      <View style={styles.container}>
        <Image source={Plug} />
        <Text style={styles.title}>Welcome to Plug</Text>
        <RainbowButton
          buttonStyle={styles.componentMargin}
          text="Create Wallet"
          onPress={onCreatePress}
        />
        <Button
          buttonStyle={styles.buttonMargin}
          text="Import Wallet"
          onPress={onImportPress}
        />
      </View>
    </Container>
  );
}

export default Welcome;
