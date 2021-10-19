import React, { useRef } from 'react';
import Touchable from '../../components/animations/Touchable';
import Icon from '../../components/icons';
import animationScales from '../../utils/animationScales';
import Modal from '../../components/modal';
import { View, Text } from 'react-native';
import useSettingsItems from '../../hooks/useSettingsItems';
import useInfoItems from '../../hooks/useInfoItems';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import SettingItem from './components/SettingItem';
import InfoItem from './components/InfoItem';

const Settings = () => {
  const modalRef = useRef(null);

  const settingsItems = useSettingsItems();
  const infoItems = useInfoItems();

  const openModal = () => {
    modalRef.current?.open();
  };

  return (
    <>
      <Touchable scale={animationScales.large} onPress={openModal}>
        <Icon name="gear" />
      </Touchable>

      <Modal modalRef={modalRef} fullHeight>
        <Header center={<Text style={FontStyles.Subtitle2}>Settings</Text>} />

        <View style={{ justifyContent: 'space-between', flex: 1, }}>
          <View>
            {
              settingsItems.map((item, index) => (
                <SettingItem {...item} border={index !== settingsItems.length} />
              ))
            }
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 30 }}>
            {
              infoItems.map(item => (
                <InfoItem {...item} />
              ))
            }
          </View>
        </View>
      </Modal>
    </>
  )
}

export default Settings;
