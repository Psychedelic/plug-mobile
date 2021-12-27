import React, { useRef } from 'react';
import { View } from 'react-native';
import Header from '../../../../components/common/Header';
import Modal from '../../../../components/modal';
import UserIcon from '../../../../components/common/UserIcon';
import AccountInfo from '../../../../components/common/AccountInfo';
import styles from './styles';
import Icon from '../../../../components/icons';
import Send from '../../../Send';
import Touchable from '../../../../components/animations/Touchable';
import { Colors } from '../../../../constants/theme';
import ActionButton from '../ActionButton';
import Deposit from '../../../Deposit';
import { useNavigation } from '@react-navigation/core';
import Routes from '../../../../navigation/Routes';
import { useSelector } from 'react-redux';

const WalletHeader = () => {
  const modalRef = useRef(null);
  const sendRef = useRef(null);
  const depositRef = useRef(null);
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

  return (
    <>
      <Header
        left={<UserIcon icon={currentWallet?.icon} size="small" onPress={() => navigation.navigate(Routes.PROFILE_SCREEN)} />}
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
