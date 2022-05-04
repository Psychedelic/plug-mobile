import React, { useRef, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';
import { View } from 'react-native';

import AccountInfo from '@commonComponents/AccountInfo';
import Touchable from '@commonComponents/Touchable';
import UserIcon from '@commonComponents/UserIcon';
import { useDebounce } from '@hooks/useDebounce';
import Header from '@commonComponents/Header';
import Deposit from '@screens/flows/Deposit';
import { Colors } from '@constants/theme';
import Routes from '@navigation/Routes';
import Send from '@screens/flows/Send';
import Modal from '@commonComponents/Modal';
import Icon from '@components/icons';

import ActionButton from '../ActionButton';
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
      disabled: true,
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
      />
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
