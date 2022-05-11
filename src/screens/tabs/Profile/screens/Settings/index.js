import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import Header from '@/components/common/Header';
import Icon from '@/components/icons';
import { Colors, FontStyles } from '@/constants/theme';
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

const Settings = () => {
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

  const settingsItems = [
    {
      icon: '📓',
      name: 'Contacts',
      description: 'Add, edit, remove contacts.',
      onPress: openContacts,
    },
    {
      icon: '🗝',
      name: 'Seed Phrase',
      description: 'View your seed phrase & backup.',
      onPress: openRevealSeedPhrase,
    },
    {
      iconName: 'faceIdIcon',
      name: 'Biometric Unlock',
      description: 'Turn Biometrics on or off.',
      onPress: openBiometricUnlock,
    },
    {
      icon: '🔒',
      name: 'Lock Account',
      description: 'Lock your account and sign out.',
      onPress: lockAccount,
    },
  ];

  return (
    <>
      <Touchable scale={animationScales.large} onPress={openModal}>
        <Icon name="gear" />
      </Touchable>
      <Modal modalRef={modalRef} fullHeight>
        <Header
          center={<Text style={FontStyles.Subtitle2}>Settings</Text>}
          right={
            <Text
              style={[FontStyles.Normal, styles.valid]}
              onPress={closeModal}>
              Close
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
              v{version}
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  valid: {
    color: Colors.ActionBlue,
  },
  version: {
    alignSelf: 'flex-end',
  },
});
