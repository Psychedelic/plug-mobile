import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Container from '../../../components/common/Container';
import { FontStyles } from '../../../constants/theme';
import RainbowButton from '../../../components/buttons/RainbowButton';
import { useNavigation } from '@react-navigation/core';
import SeedPhrase from '../../../components/common/SeedPhrase';
import Copy from '../../../components/common/Copy';

const MNEMONIC = ['spread1', 'young1', 'spread2', 'young2', 'spread3', 'young3', 'spread4', 'young4', 'spread5', 'young5'];

const BackupSeedPhrase = () => {
  const [revealed, setRevealed] = useState(false);
  const navigation = useNavigation();

  const onPress = () => null;
  const onReveal = () => setRevealed(true);

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Seed Phrase Backup</Text>
        <Text style={styles.subtitle}>Below is the seed phrase for your new wallet, write it down.</Text>

        <SeedPhrase mnemonic={MNEMONIC} onReveal={onReveal} />

        <Copy text={MNEMONIC.join(' ')} customStyle={{ marginTop: 30 }} />

        <RainbowButton
          buttonStyle={styles.button}
          text="I've saved these words"
          onPress={onPress}
          disabled={!revealed}
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
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  button: {
    marginTop: 30,
  }
});