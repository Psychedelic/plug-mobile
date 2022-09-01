import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import { ActionButton } from '@/components/common';
import Header from '@/components/common/Header';
import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import { blogUrl, discordUrl, docsUrl, twitterUrl } from '@/constants/urls';
import { Separator } from '@/layout';
import Routes from '@/navigation/Routes';
import { reset as resetICPStore } from '@/redux/slices/icp';
import { lock, reset as resetKeyringStore } from '@/redux/slices/keyring';
import { reset as resetUserStore } from '@/redux/slices/user';
import { clearState as resetWalletConnectStore } from '@/redux/slices/walletconnect';
import Contacts from '@/screens/tabs/Profile/screens/Contacts';
import animationScales from '@/utils/animationScales';
import { clearStorage } from '@/utils/localStorage';

import ConnectedApps from '../ConnectedApps';
import DeleteWallet from '../DeleteWallet';
import RevealSeedPhrase from '../RevealSeedPhrase';
import BiometricUnlock from './components/BiometricUnlock';
import InfoItem from './components/InfoItem';
import SettingItem from './components/SettingItem';
import styles from './styles';

const Settings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const modalRef = useRef(null);
  const contactsRef = useRef(null);
  const biometricUnlockRef = useRef(null);
  const revealSeedPhraseRef = useRef(null);
  const deleteWalletRef = useRef(null);
  const connectedAppsRefs = useRef(null);

  const dispatch = useDispatch();
  const { biometricsAvailable } = useSelector(state => state.user);

  const openRevealSeedPhrase = () => {
    revealSeedPhraseRef.current?.open();
  };

  const openBiometricUnlock = () => {
    biometricUnlockRef.current?.open();
  };

  const openContacts = () => {
    contactsRef.current?.open();
  };

  const openDeleteWallet = () => {
    deleteWalletRef.current?.open();
  };

  const handleDeleteWallet = () => {
    clearStorage();
    dispatch(resetUserStore());
    dispatch(resetICPStore());
    dispatch(resetWalletConnectStore());
    dispatch(resetKeyringStore());
    deleteWalletRef.current?.close();
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.WELCOME_SCREEN }],
    });
  };

  const openConnectedApps = () => {
    connectedAppsRefs.current?.open();
  };

  const lockAccount = () => {
    modalRef.current?.close();
    dispatch(lock());
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
        icon: '📱️️️️',
        name: t('settings.items.connectedApps.name'),
        description: t('settings.items.connectedApps.desc'),
        onPress: openConnectedApps,
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

  const infoItems = useMemo(
    () => [
      {
        name: t('settings.infoItems.docs'),
        onPress: () => Linking.openURL(docsUrl),
      },
      {
        name: t('settings.infoItems.blog'),
        onPress: () => Linking.openURL(blogUrl),
      },
      {
        name: t('settings.infoItems.twitter'),
        onPress: () => Linking.openURL(twitterUrl),
      },
      {
        name: t('settings.infoItems.discord'),
        onPress: () => Linking.openURL(discordUrl),
      },
      {
        name: t('settings.infoItems.delete'),
        onPress: openDeleteWallet,
        destructive: true,
      },
    ],
    []
  );

  return (
    <>
      <Touchable scale={animationScales.large} onPress={modalRef.current?.open}>
        <Icon name="gear" />
      </Touchable>
      <Modal
        modalRef={modalRef}
        fullHeight
        HeaderComponent={
          <Header
            center={<Text type="subtitle2">{t('settings.title')}</Text>}
            right={
              <ActionButton
                label={t('common.close')}
                onPress={modalRef.current?.close}
              />
            }
          />
        }>
        <View style={styles.container}>
          <View>{settingsItems.map(renderSettingsItem)}</View>
          <View style={styles.infoContainer}>
            {infoItems.map(item => (
              <InfoItem {...item} key={item.name} />
            ))}
            <Text style={[FontStyles.SmallGray, styles.version]}>
              {t('settings.version', {
                version: getVersion(),
                build: getBuildNumber(),
              })}
            </Text>
          </View>
        </View>
      </Modal>
      <Contacts modalRef={contactsRef} />
      <RevealSeedPhrase modalRef={revealSeedPhraseRef} />
      <BiometricUnlock modalRef={biometricUnlockRef} />
      <DeleteWallet modalRef={deleteWalletRef} onDelete={handleDeleteWallet} />
      <ConnectedApps modalRef={connectedAppsRefs} />
    </>
  );
};

export default Settings;
