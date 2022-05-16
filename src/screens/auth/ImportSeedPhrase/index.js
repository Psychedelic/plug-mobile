import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PlugLogo from '@/assets/icons/plug-logo-full.png';
import Back from '@/commonComponents/Back';
import Header from '@/commonComponents/Header';
import KeyboardHider from '@/commonComponents/KeyboardHider';
import TextInput from '@/commonComponents/TextInput';
import RainbowButton from '@/components/buttons/RainbowButton';
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
  const [loading, setLoading] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [invalidSeedPhrase, setInvalidSeedPhrase] = useState(false);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const onPress = async () => {
    setLoading(true);
    try {
      dispatch(reset());
      dispatch(
        importWallet({
          icpPrice,
          mnemonic: seedPhrase,
          password,
          onError: () => {
            setError(true);
            setLoading(false);
          },
          onSuccess: async () => {
            if (shouldSaveBiometrics) {
              await saveBiometrics(password);
            }
            setLoading(false);
            setError(false);
            navigation.navigate(Routes.SWIPE_LAYOUT);
          },
        }),
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
      <KeyboardHider>
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
          />
          {error && (
            <Text style={styles.errorText}>
              {t('importSeedPhrase.notFound')}
            </Text>
          )}
          <RainbowButton
            text={t('common.continue')}
            onPress={onPress}
            loading={loading}
            buttonStyle={styles.button}
            disabled={!isMnemonicValid || loading}
          />
        </View>
      </KeyboardHider>
    </Container>
  );
};

export default ImportSeedPhrase;
