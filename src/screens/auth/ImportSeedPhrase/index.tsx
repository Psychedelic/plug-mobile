import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import PlugLogo from '@/assets/icons/plug-logo-full.png';
import RainbowButton from '@/components/buttons/RainbowButton';
import {
  ActionButton,
  Header,
  KeyboardScrollView,
  Text,
  TextInput,
} from '@/components/common';
import { TestIds } from '@/constants/testIds';
import useKeychain from '@/hooks/useKeychain';
import { RootScreenProps } from '@/interfaces/navigation';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getICPPrice } from '@/redux/slices/icp';
import { clear, importWallet } from '@/redux/slices/keyring';

import styles from './styles';

const ImportSeedPhrase = ({
  navigation,
  route,
}: RootScreenProps<Routes.IMPORT_SEED_PHRASE>) => {
  const { goBack } = navigation;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { saveBiometrics, resetBiometrics } = useKeychain();
  const { icpPrice } = useAppSelector(state => state.icp);
  const { password, shouldSaveBiometrics } = route?.params || {};

  const [error, setError] = useState(false);
  const [importingWallet, setImportingWallet] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState<string>();
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const importWalletFromSeedPhrase = async () => {
    setImportingWallet(true);
    setTimeout(() => {
      dispatch(clear());
      dispatch(
        importWallet({
          icpPrice,
          mnemonic: seedPhrase!,
          password,
          onError: () => {
            setError(true);
            setImportingWallet(false);
          },
          onSuccess: async () => {
            if (shouldSaveBiometrics) {
              await saveBiometrics(password);
            } else {
              resetBiometrics();
            }
            setImportingWallet(false);
            setError(false);
            navigation.navigate(Routes.SWIPE_LAYOUT);
          },
        })
      );
    }, 500);
  };

  const isMnemonicValid =
    !!seedPhrase &&
    seedPhrase.trim().split(/\s+/g).length === 12 &&
    !invalidSeedPhrase;

  const onChangeText = (text: string) => {
    setSeedPhrase(text);
    setInvalidSeedPhrase(false);
  };

  return (
    <Container>
      <Header
        left={<ActionButton onPress={goBack} label={t('common.back')} />}
        center={
          <Image
            style={styles.plugLogo}
            source={PlugLogo}
            resizeMode="contain"
          />
        }
      />
      <KeyboardScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.title}>{t('common.importWallet')}</Text>
          <Text style={styles.subtitle}>
            {t('importSeedPhrase.enterPhrase')}
          </Text>
          <TextInput
            multiline
            autoCapitalize="none"
            value={seedPhrase}
            onChangeText={onChangeText}
            placeholder={t('importSeedPhrase.secretPhrase')}
            style={styles.input}
            contentContainerStyle={styles.inputContainer}
            testID={TestIds.IMPORT_SEED_PHRASE.PHRASE_INPUT}
            autoFocus
          />
          {error && (
            <Text style={styles.errorText}>
              {t('importSeedPhrase.notFound')}
            </Text>
          )}
          <RainbowButton
            text={t('common.continue')}
            onPress={importWalletFromSeedPhrase}
            loading={importingWallet}
            buttonStyle={styles.button}
            disabled={!isMnemonicValid}
          />
        </View>
      </KeyboardScrollView>
    </Container>
  );
};

export default ImportSeedPhrase;
