import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import Container from '../../../components/common/Container';
import TextInput from '../../../components/common/TextInput';
import { Colors, FontStyles } from '../../../constants/theme';
import Routes from '../../../navigation/Routes';
import RainbowButton from '../../../components/buttons/RainbowButton';
import Header from '../../../components/common/Header';
import PlugLogo from '../../../assets/icons/plug-logo-full.png';
import Back from '../../../components/common/Back';
import useKeyring from '../../../hooks/useKeyring';

const ImportSeedPhrase = ({ navigation }) => {
  const { importWallet } = useKeyring();
  const { goBack } = navigation;
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);

  const onPress = () => {
    /*try {
      importWallet({ mnemonic: seedPhrase });
    }
    catch (e) {
      console.log(e);
    }*/
    navigation.navigate(Routes.CREATE_PASSWORD, {
      navigateTo: Routes.BACKUP_SEED_PHRASE,
    })
  };

  const validateMnemonic = () => (
    seedPhrase === null
    || seedPhrase.trim().split(/\s+/g).length !== 12
    || invalidSeedPhrase
  )

  const onChangeText = (e) => {
    setSeedPhrase(e);
    setInvalidSeedPhrase(false);
  }

  return (
    <Container>

      <Header
        left={<Back onPress={() => goBack()} />}
        center={<View style={{ width: 70, height: 33 }}>
          <Image style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'contain'
          }} source={PlugLogo} />
        </View>}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Import Wallet</Text>
        <Text style={styles.subtitle}>Please enter your 12 word Secret Recovery Phrase.</Text>

        <TextInput
          value={seedPhrase}
          variant='multi'
          onChangeText={onChangeText}
          placeholder='Secret Recovery Phrase'
          customStyle={{ backgroundColor: Colors.Gray.Secondary, marginTop: 30, marginBottom: 30 }}
          multiline
        />

        <RainbowButton
          text="Continue"
          onPress={onPress}
          disabled={validateMnemonic()}
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