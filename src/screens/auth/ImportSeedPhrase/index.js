import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PlugLogo from '@/assets/icons/plug-logo-full.png';
import Back from '@/commonComponents/Back';
import Header from '@/commonComponents/Header';
import TextInput from '@/commonComponents/TextInput';
import RainbowButton from '@/components/buttons/RainbowButton';
import KeyboardScrollView from '@/components/common/KeyboardScrollView';
import { TestIds } from '@/constants/testIds';
import useKeychain from '@/hooks/useKeychain';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { getICPPrice } from '@/redux/slices/icp';
import { importWallet, reset } from '@/redux/slices/keyring';

import styles from './styles';

const ImportSeedPhrase = ({ navigation, route }) => {
  const { goBack } = navigation;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { saveBiometrics } = useKeychain();
  const { icpPrice } = useSelector(state => state.icp);
  const { password, shouldSaveBiometrics } = route?.params || {};

  const [error, setError] = useState(false);
  const [importingWallet, setImportingWallet] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  useEffect(() => {
    // This is the only way to make the loading button work fine, otherwise it's laggy.
    if (importingWallet) {
      importWalletFromSeedPhrase();
    }
  }, [importingWallet, setImportingWallet]);

  const importWalletFromSeedPhrase = async () => {
    try {
      dispatch(reset());
      dispatch(
        importWallet({
          icpPrice,
          mnemonic: seedPhrase,
          password,
          onError: () => {
            setError(true);
            setImportingWallet(false);
          },
          onSuccess: async () => {
            if (shouldSaveBiometrics) {
              await saveBiometrics(password);
            }
            setImportingWallet(false);
            setError(false);
            navigation.navigate(Routes.SWIPE_LAYOUT);
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const isMnemonicValid =
    seedPhrase !== null &&
    seedPhrase.trim().split(/\s+/g).length === 12 &&
    !invalidSeedPhrase;

  const onChangeText = e => {
    setSeedPhrase(e);
    setInvalidSeedPhrase(false);
  };

  return (
    <Container>
      <Header
        left={<Back onPress={goBack} />}
        center={
          <View style={styles.plugLogoContainer}>
            <Image style={styles.plugLogo} source={PlugLogo} />
          </View>
        }
      />
      <KeyboardScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <Text style={styles.title}>{t('importSeedPhrase.title')}</Text>
          <Text style={styles.subtitle}>
            {t('importSeedPhrase.enterPhrase')}
          </Text>
          <TextInput
            multiline
            variant="multi"
            value={seedPhrase}
            onChangeText={onChangeText}
            placeholder={t('importSeedPhrase.secretPhrase')}
            customStyle={styles.input}
            testID={TestIds.IMPORT_SEED_PHRASE.PHRASE_INPUT}
          />
          {error && (
            <Text style={styles.errorText}>
              {t('importSeedPhrase.notFound')}
            </Text>
          )}
          <RainbowButton
            text={t('common.continue')}
            onPress={() => setImportingWallet(true)}
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
