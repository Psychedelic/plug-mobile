import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import Container from '../../../components/common/Container';
import TextInput from '../../../components/common/TextInput';
import { Colors, FontStyles } from '../../../constants/theme';
import RainbowButton from '../../../components/buttons/RainbowButton';
import { useNavigation } from '@react-navigation/core';
import Routes from '../../../navigation/Routes';

const BackupSeedPhrase = () => {
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [faceId, setFaceId] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = () => setFaceId(previousState => !previousState);

  const onPress = () => navigation.navigate(Routes.BACKUP_SEED_PHRASE);

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Seed Phrase Backup</Text>
        <Text style={styles.subtitle}>Below is the seed phrase for your new wallet, write it down.</Text>

        <RainbowButton
          buttonStyle={styles.componentMargin}
          text="I've saved these words"
          onPress={onPress}
        />

      </View>
    </Container>
  )
};

export default BackupSeedPhrase;

const styles = StyleSheet.create({
  title: {
    ...FontStyles.Title,
    marginTop: 20,
  },
  subtitle: {
    ...FontStyles.NormalGray,
    marginTop: 5,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  switchContainer:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 35,
  },
  faceId:{
    ...FontStyles.NormalGray,
    fontSize: 16,
  }
});