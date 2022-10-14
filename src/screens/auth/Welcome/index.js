import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';

import Plug from '@/assets/icons/il_white_plug.png';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';

import styles from './styles';

function Welcome() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isInitialized } = useSelector(state => state.keyring);

  const onPress = flow => () =>
    navigation.navigate(Routes.CREATE_PASSWORD, {
      flow,
    });

  const handleBack = () => {
    navigation.navigate(Routes.LOGIN_SCREEN, { manualLock: true });
  };

  const title = isInitialized ? t('welcome.initTitle') : t('welcome.title');
  const importTitle = isInitialized
    ? t('welcome.importNew')
    : t('common.importWallet');
  const createTitle = isInitialized
    ? t('welcome.createNew')
    : t('welcome.create');

  return (
    <Container>
      {isInitialized && (
        <Text style={[FontStyles.Normal, styles.valid]} onPress={handleBack}>
          {t('common.back')}
        </Text>
      )}
      <View style={styles.container}>
        <Image source={Plug} style={styles.plugIcon} />
        <Text style={styles.title}>{title}</Text>
        <RainbowButton
          buttonStyle={[styles.componentMargin, styles.buttonStyling]}
          text={createTitle}
          onPress={onPress('create')}
        />
        <Button
          buttonStyle={[styles.buttonMargin, styles.buttonStyling]}
          text={importTitle}
          onPress={onPress('import')}
        />
      </View>
    </Container>
  );
}

export default Welcome;
