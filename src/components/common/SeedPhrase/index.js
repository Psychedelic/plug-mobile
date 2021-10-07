import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import { Colors, FontStyles } from '../../../constants/theme';
import ListItem from '../ListItem';
import { BlurView } from '@react-native-community/blur';
import KeyImg from '../../../assets/icons/key.png';

const SeedPhrase = ({ mnemonic, onReveal }) => {
  const [reveal, setReveal] = useState(false);

  const revealSeedPhrase = () => {
    setReveal(true);
    onReveal();
  };

  return (
    <View style={styles.container}>
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
          <Touchable>
            <View onPress={revealSeedPhrase} style={styles.absolute}>
              <Image source={KeyImg} />
              <Text style={styles.reveal}>Reveal Seed Phrase</Text>
            </View>
          </Touchable>
        </>
      )}
    </View>
  );
};

export default SeedPhrase;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Black.Pure,
    width: '100%',
    borderRadius: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 237,
    paddingHorizontal: 40,
    paddingVertical: 25,
    alignContent: 'space-between',
    position: 'relative',
    borderColor: Colors.Gray.Secondary,
    borderWidth: 1,
  },
  item: {
    width: '50%',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reveal: {
    ...FontStyles.Normal,
    fontWeight: 'bold',
    marginTop: 6,
  },
});
