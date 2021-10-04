import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import Container from '../../../../components/common/Container';
import RainbowButton from '../../../../components/buttons/RainbowButton';
import SeedPhrase from '../../../../components/common/SeedPhrase';
import Copy from '../../../../components/common/Copy';
import Header from '../../../../components/common/Header';
import PlugLogo from '../../../../assets/icons/plug-logo-full.png';
import Back from '../../../../components/common/Back';
import styles from './styles';

const MNEMONIC = [
  'spread1',
  'young1',
  'spread2',
  'young2',
  'spread3',
  'young3',
  'spread4',
  'young4',
  'spread5',
  'young5',
];

const BackupSeedPhrase = ({ navigation }) => {
  const { goBack } = navigation;
  const [revealed, setRevealed] = useState(false);

  const onPress = () => null;
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
  );
};

export default BackupSeedPhrase;
