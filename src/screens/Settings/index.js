import React, { useRef } from 'react';
import Touchable from '../../components/animations/Touchable';
import Icon from '../../components/icons';
import animationScales from '../../utils/animationScales';
import Modal from '../../components/modal';
import { View, Text, StyleSheet } from 'react-native';
import useInfoItems from '../../hooks/useInfoItems';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import SettingItem from './components/SettingItem';
import InfoItem from './components/InfoItem';
import Separator from '../../components/layout/Separator';
import Contacts from '../Contacts';

const Settings = () => {
  const modalRef = useRef(null);
  const contactsRef = useRef(null);

  //const settingsItems = useSettingsItems();
  const infoItems = useInfoItems();

  const openModal = () => {
    modalRef.current?.open();
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
      onPress: null,
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
              <>
                <SettingItem {...item} />
                {index !== settingsItems.length && <Separator />}
              </>
            ))}
          </View>
          <View style={styles.infoContainer}>
            {infoItems.map(item => (
              <InfoItem {...item} />
            ))}
          </View>
        </View>
      </Modal>

      <Contacts modalRef={contactsRef} />
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
