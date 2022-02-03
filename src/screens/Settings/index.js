import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Touchable from '../../components/animations/Touchable';
import Separator from '../../components/layout/Separator';
import animationScales from '../../utils/animationScales';
import useInfoItems from '../../hooks/useInfoItems';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import SettingItem from './components/SettingItem';
import RevealSeedPhrase from '../RevealSeedPhrase';
import InfoItem from './components/InfoItem';
import Modal from '../../components/modal';
import Icon from '../../components/icons';
import Contacts from '../Contacts';
import FaceId from './components/FaceId';

const Settings = () => {
  const modalRef = useRef(null);
  const contactsRef = useRef(null);
  const revealSeedPhraseRef = useRef(null);
  const faceIdRef = useRef(null);

  const infoItems = useInfoItems();

  const openModal = () => {
    modalRef.current?.open();
  };

  const openRevealSeedPhrase = () => {
    revealSeedPhraseRef.current?.open();
  };

  const openFaceId = () => {
    faceIdRef.current?.open();
  };

  const openContacts = () => {
    contactsRef.current?.open();
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
      name: 'Face ID',
      description: 'Turn Face ID on or off.',
      onPress: openFaceId,
    },
  ];

  return (
    <>
      <Touchable scale={animationScales.large} onPress={openModal}>
        <Icon name="gear" />
      </Touchable>
      <Modal modalRef={modalRef} fullHeight>
        <Header center={<Text style={FontStyles.Subtitle2}>Settings</Text>} />
        <View style={styles.container}>
          <View>
            {settingsItems.map((item, index) => (
              <View key={item.name}>
                <SettingItem {...item} />
                {index !== settingsItems.length && <Separator />}
              </View>
            ))}
          </View>
          <View style={styles.infoContainer}>
            {infoItems.map(item => (
              <InfoItem {...item} key={item.name} />
            ))}
          </View>
        </View>
      </Modal>
      <Contacts modalRef={contactsRef} />
      <RevealSeedPhrase modalRef={revealSeedPhraseRef} />
      <FaceId modalRef={faceIdRef} />
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
});
