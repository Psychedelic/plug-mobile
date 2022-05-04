import { BlurView } from '@react-native-community/blur';
import { Image, View, Text } from 'react-native';
import React, { useState } from 'react';

import Touchable from '@commonComponents/Touchable';
import ListItem from '@commonComponents/ListItem';
import KeyImg from '@assets/icons/key.png';

import styles from './styles';

const SeedPhrase = ({ mnemonic, onReveal = () => null }) => {
  const [reveal, setReveal] = useState(false);
  const revealSeedPhrase = () => {
    setReveal(true);
    onReveal();
  };

  return (
    <View style={styles.container} onPress={revealSeedPhrase}>
      {mnemonic.map((word, i) => (
        <View style={styles.item} key={word}>
          <ListItem number={i + 1} text={word} />
        </View>
      ))}
      {!reveal && (
        <>
          <BlurView
            style={styles.absolute}
            blurType={'dark'}
            reducedTransparencyFallbackColor="black"
          />
          <Touchable onPress={revealSeedPhrase} style={styles.absolute}>
            <Image source={KeyImg} />
            <Text style={styles.reveal}>Reveal Seed Phrase</Text>
          </Touchable>
        </>
      )}
    </View>
  );
};

export default SeedPhrase;
