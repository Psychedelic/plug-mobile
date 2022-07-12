import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, View } from 'react-native';

import PlugLogo from '@/assets/icons/plug-logo-full.png';
import Back from '@/commonComponents/Back';
import Copy from '@/commonComponents/Copy';
import Header from '@/commonComponents/Header';
import SeedPhrase from '@/commonComponents/SeedPhrase';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';

import styles from './styles';

const BackupSeedPhrase = ({ route, navigation }) => {
  const { goBack } = navigation;
  const { t } = useTranslation();
  const { mnemonic } = route?.params || {};
  const [revealed, setRevealed] = useState(false);

  const onPress = () => navigation.navigate(Routes.SWIPE_LAYOUT);
  const onReveal = () => setRevealed(true);

  return (
    <Container>
      <Header
        left={<Back onPress={goBack} />}
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
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
        bounces={false}
        overScrollMode="never">
        <Text style={styles.title}>{t('backupSeed.title')}</Text>
        <Text style={styles.subtitle}>{t('backupSeed.subtitle')}</Text>
        <SeedPhrase mnemonic={mnemonic.split(' ')} onReveal={onReveal} />
        <Copy text={mnemonic} customStyle={styles.copy} />
        <RainbowButton
          buttonStyle={styles.button}
          text={t('backupSeed.confirm')}
          onPress={onPress}
          disabled={!revealed}
        />
      </ScrollView>
    </Container>
  );
};

export default BackupSeedPhrase;
