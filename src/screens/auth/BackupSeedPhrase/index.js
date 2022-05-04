import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';

import RainbowButton from '@components/buttons/RainbowButton';
import PlugLogo from '@assets/icons/plug-logo-full.png';
import SeedPhrase from '@commonComponents/SeedPhrase';
import Header from '@commonComponents/Header';
import Copy from '@commonComponents/Copy';
import Back from '@commonComponents/Back';
import Routes from '@navigation/Routes';
import { Container } from '@layout';

import styles from './styles';

const BackupSeedPhrase = ({ route, navigation }) => {
  const { goBack } = navigation;
  const { mnemonic } = route?.params || {};
  const [revealed, setRevealed] = useState(false);

  const onPress = () => navigation.navigate(Routes.SWIPE_LAYOUT);
  const onReveal = () => setRevealed(true);

  return (
    <Container>
      <Header
        left={<Back onPress={() => goBack()} />}
        center={
          <View style={{ width: 70, height: 33 }}>
            <Image
              style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'contain',
              }}
              source={PlugLogo}
            />
          </View>
        }
      />
      <View style={styles.container}>
        <Text style={styles.title}>Seed Phrase Backup</Text>
        <Text style={styles.subtitle}>
          Below is the seed phrase for your new wallet, write it down.
        </Text>
        <SeedPhrase mnemonic={mnemonic.split(' ')} onReveal={onReveal} />
        <Copy text={mnemonic} customStyle={styles.copy} />
        <RainbowButton
          buttonStyle={styles.button}
          text="I've saved these words"
          onPress={onPress}
          disabled={!revealed}
        />
      </View>
    </Container>
  );
};

export default BackupSeedPhrase;
