import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Container from '../../../components/common/Container';
import TextInput from '../../../components/common/TextInput';
import { Colors, FontStyles } from '../../../constants/theme';
import Routes from '../../../navigation/Routes';
import { useNavigation } from '@react-navigation/core';
import RainbowButton from '../../../components/buttons/RainbowButton';
import Header from '../../../components/common/Header';
import PlugLogo from '../../../assets/icons/plug-logo-full.png';

const ImportSeedPhrase = ({ navigation }) => {
  const { goBack } = navigation;
  const [seedPhrase, setSeedPhrase] = useState(null);

  const onPress = () => navigation.navigate(Routes.CREATE_PASSWORD, {
    navigateTo: Routes.BACKUP_SEED_PHRASE,
  });//change with real route

  return (
    <Container>

      <Header left={<Button onPress={() => goBack()} title="< Back" />}
        center={<Image source={PlugLogo} />}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Import Wallet</Text>
        <Text style={styles.subtitle}>Please enter your 12 word Secret Recovery Phrase.</Text>

        <TextInput
          value={seedPhrase}
          variant='multi'
          onChangeText={setSeedPhrase}
          placeholder='Secret Recovery Phrase'
          customStyle={{ backgroundColor: Colors.Gray.Secondary, marginTop: 30, marginBottom: 30 }}
          multiline
        />

        <RainbowButton
          text="Continue"
          onPress={onPress}
        />


      </View>
    </Container>
  )
};

export default ImportSeedPhrase;

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
    paddingHorizontal: 30,
  }
});