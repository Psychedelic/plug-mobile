import { BlurView } from '@react-native-community/blur';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import KeyImg from '@/assets/icons/key.png';
import ListItem from '@/commonComponents/ListItem';
import Touchable from '@/commonComponents/Touchable';
import { TestIds } from '@/constants/testIds';

import Text from '../Text';
import styles from './styles';

const SeedPhrase = ({ mnemonic, onReveal = () => null }) => {
  const { t } = useTranslation();
  const [reveal, setReveal] = useState(false);
  const revealSeedPhrase = () => {
    setReveal(true);
    onReveal();
  };

  return (
    <View
      style={styles.container}
      onPress={revealSeedPhrase}
      testID={TestIds.COMMON.SEED_PHRASE_VIEW}>
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
            overlayColor="transparent">
            <Touchable onPress={revealSeedPhrase} style={styles.absolute}>
              <Image source={KeyImg} />
              <Text style={styles.reveal}>{t('common.revealPhrase')}</Text>
            </Touchable>
          </BlurView>
        </>
      )}
    </View>
  );
};

export default SeedPhrase;
