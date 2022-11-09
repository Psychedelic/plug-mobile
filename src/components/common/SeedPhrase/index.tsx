import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, View } from 'react-native';

import KeyImg from '@/assets/icons/key.png';
import { Text, Touchable } from '@/components/common';
import { TestIds } from '@/constants/testIds';

import ListItem from './components/ListItem';
import styles from './styles';

interface Props {
  mnemonic: string[];
  onReveal?: () => void;
}

const SeedPhrase = ({ mnemonic, onReveal = () => {} }: Props) => {
  const { t } = useTranslation();
  const [reveal, setReveal] = useState(false);
  const revealSeedPhrase = () => {
    setReveal(true);
    onReveal();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={revealSeedPhrase}
      testID={TestIds.COMMON.SEED_PHRASE_VIEW}>
      {mnemonic.map((word: string, i: number) => (
        <View style={styles.item} key={word}>
          <ListItem number={i + 1} text={word} />
        </View>
      ))}
      {!reveal && (
        <>
          <BlurView
            style={styles.absolute}
            blurType="dark"
            reducedTransparencyFallbackColor="black"
            overlayColor="transparent">
            <Touchable onPress={revealSeedPhrase} style={styles.absolute}>
              <Image source={KeyImg} />
              <Text style={styles.reveal}>{t('common.revealPhrase')}</Text>
            </Touchable>
          </BlurView>
        </>
      )}
    </Pressable>
  );
};

export default SeedPhrase;
