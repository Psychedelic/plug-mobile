import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Container from '../../../components/common/Container';
import TextInput from '../../../components/common/TextInput';
import { Colors, FontStyles } from '../../../constants/theme';

const ImportSeedPhrase = () => {
  const [seedPhrase, setSeedPhrase] = useState(null);

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Import Wallet</Text>
        <Text style={styles.subtitle}>Please enter your 12 word Secret Recovery Phrase.</Text>

        <TextInput
          value={seedPhrase}
          variant='multi'
          onChangeText={setSeedPhrase}
          placeholder='Secret Recovery Phrase'
          customStyle={{ backgroundColor: Colors.Gray.Secondary, marginTop: 20 }}
          multiline
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
    padding: 20,
  }
});