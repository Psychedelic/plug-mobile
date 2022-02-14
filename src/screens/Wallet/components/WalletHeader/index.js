import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';

import Settings from '../../../Settings';
import AccountInfo from '../../../../components/common/AccountInfo';
import Touchable from '../../../../components/animations/Touchable';
import UserIcon from '../../../../components/common/UserIcon';
import { useDebounce } from '../../../../hooks/useDebounce';
import Header from '../../../../components/common/Header';
import { Colors } from '../../../../constants/theme';
import Routes from '../../../../navigation/Routes';
import Modal from '../../../../components/modal';
import Icon from '../../../../components/icons';
import ActionButton from '../ActionButton';
import Deposit from '../../../Deposit';
import Send from '../../../Send';
import styles from './styles';

const WalletHeader = () => {
  const modalRef = useRef(null);
  const sendRef = useRef(null);
  const depositRef = useRef(null);
  const { debounce } = useDebounce();
  const [navigated, setNavigated] = useState(false);
  const { currentWallet } = useSelector(state => state.keyring);

  const navigation = useNavigation();

  const openModal = () => {
    modalRef.current?.open();
  };

  const openSend = () => {
    modalRef.current?.close();
    sendRef.current?.open();
  };

  const openDeposit = () => {
    modalRef.current?.close();
    depositRef.current?.open();
  };

  const BUTTONS = [
    {
      image: <Icon name="deposit" />,
      colors: [Colors.Rainbow.Red, Colors.Rainbow.Yellow],
      text: 'Deposit',
      onPress: openDeposit,
    },
    {
      image: <Icon name="send" />,
      colors: [Colors.Rainbow.Blue, Colors.Rainbow.Purple],
      text: 'Send',
      onPress: openSend,
    },
    {
      image: <Icon name="swap" />,
      colors: [Colors.Rainbow.Green, Colors.Rainbow.Teal],
      text: 'Swap',
    },
  ];

  useEffect(() => {
    setNavigated(false);
    return () => setNavigated(true);
  });

  const handleGoToProfile = () => {
    if (!navigated) {
      setNavigated(true);
      navigation.jumpTo(Routes.PROFILE_SCREEN);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: Colors.Black.Pure,
          paddingTop: 42,
        }}>
        <Header
          left={
            <UserIcon
              icon={currentWallet?.icon}
              size="small"
              onPress={() => debounce(handleGoToProfile)}
            />
          }
          center={<AccountInfo />}
          right={
            <Touchable onPress={openModal}>
              <Icon name="groupedActions" />
            </Touchable>
          }
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        />
      </View>
      <Modal modalRef={modalRef} adjustToContentHeight>
        <View style={styles.container}>
          <View style={styles.buttons}>
            {BUTTONS.map(button => (
              <ActionButton {...button} key={button.text} />
            ))}
          </View>
        </View>
      </Modal>
      <Send modalRef={sendRef} />
      <Deposit modalRef={depositRef} />
    </>
  );
};

export default WalletHeader;
