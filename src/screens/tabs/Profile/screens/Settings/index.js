import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import Header from '@/components/common/Header';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import { Separator } from '@/layout';
import { setUnlocked } from '@/redux/slices/keyring';
import Contacts from '@/screens/tabs/Profile/screens/Contacts';
import animationScales from '@/utils/animationScales';

import { version } from '../../../../../../package.json';
import RevealSeedPhrase from '../RevealSeedPhrase';
import BiometricUnlock from './components/BiometricUnlock';
import InfoItem from './components/InfoItem';
import SettingItem from './components/SettingItem';
import { infoItems } from './constants';
import styles from './styles';

const Settings = () => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const contactsRef = useRef(null);
  const biometricUnlockRef = useRef(null);
  const revealSeedPhraseRef = useRef(null);

  const dispatch = useDispatch();
  const { biometricsAvailable } = useSelector(state => state.user);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const openRevealSeedPhrase = () => {
    revealSeedPhraseRef.current?.open();
  };

  const openBiometricUnlock = () => {
    biometricUnlockRef.current?.open();
  };

  const openContacts = () => {
    contactsRef.current?.open();
  };

  const lockAccount = () => {
    closeModal();
    dispatch(setUnlocked(false));
  };

  const renderSettingsItem = (item, index) => {
    const isBiometrics = index === 2;
    return isBiometrics && !biometricsAvailable ? null : (
      <View key={item.name}>
        <SettingItem {...item} />
        {index + 1 !== settingsItems.length && <Separator />}
      </View>
    );
  };

  const settingsItems = useMemo(
    () => [
      {
        icon: '📓',
        name: t('settings.items.contacts.name'),
        description: t('settings.items.contacts.desc'),
        onPress: openContacts,
      },
      {
        icon: '🗝',
        name: t('settings.items.phrase.name'),
        description: t('settings.items.phrase.desc'),
        onPress: openRevealSeedPhrase,
      },
      {
        iconName: 'faceIdIcon',
        name: t('settings.items.biometric.name'),
        description: t('settings.items.biometric.desc'),
        onPress: openBiometricUnlock,
      },
      {
        icon: '🔒',
        name: t('settings.items.lock.name'),
        description: t('settings.items.lock.desc'),
        onPress: lockAccount,
      },
    ],
    []
  );

  return (
    <>
      <Touchable scale={animationScales.large} onPress={openModal}>
        <Icon name="gear" />
      </Touchable>
      <Modal modalRef={modalRef} fullHeight>
        <Header
          center={<Text style={styles.title}>{t('settings.title')}</Text>}
          right={
            <Text
              style={[FontStyles.Normal, styles.valid]}
              onPress={closeModal}>
              {t('common.close')}
            </Text>
          }
        />
        <View style={styles.container}>
          <View>{settingsItems.map(renderSettingsItem)}</View>
          <View style={styles.infoContainer}>
            {infoItems.map(item => (
              <InfoItem {...item} key={item.name} />
            ))}
            <Text style={[FontStyles.SmallGray, styles.version]}>
              {t('settings.version', { version })}
            </Text>
          </View>
        </View>
      </Modal>
      <Contacts modalRef={contactsRef} />
      <RevealSeedPhrase modalRef={revealSeedPhraseRef} />
      <BiometricUnlock modalRef={biometricUnlockRef} />
    </>
  );
};

export default Settings;
