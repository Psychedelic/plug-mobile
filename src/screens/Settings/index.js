import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

import Touchable from '../../components/animations/Touchable';
import { FontStyles, Colors } from '../../constants/theme';
import BiometricUnlock from './components/BiometricUnlock';
import Separator from '../../components/layout/Separator';
import animationScales from '../../utils/animationScales';
import useInfoItems from '../../hooks/useInfoItems';
import Header from '../../components/common/Header';
import SettingItem from './components/SettingItem';
import RevealSeedPhrase from '../RevealSeedPhrase';
import { version } from '../../../package.json';
import InfoItem from './components/InfoItem';
import Modal from '../../components/modal';
import Icon from '../../components/icons';
import Contacts from '../Contacts';

const Settings = () => {
  const modalRef = useRef(null);
  const contactsRef = useRef(null);
  const revealSeedPhraseRef = useRef(null);
  const biometricUnlockRef = useRef(null);
  const { biometricsAvailable } = useSelector(state => state.user);

  const infoItems = useInfoItems();

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

  const renderSettingsItem = (item, index) => {
    const isBiometrics = index === 2;
    return isBiometrics && !biometricsAvailable ? null : (
      <View key={item.name}>
        <SettingItem {...item} />
        {index !== settingsItems.length && <Separator />}
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
