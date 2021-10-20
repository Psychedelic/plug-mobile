import React, { useRef } from 'react';
import { View } from 'react-native';
import Header from '../../../../components/common/Header';
import Modal from '../../../../components/modal';
import GradientText from '../../../../components/common/GradientText';
import UserIcon from '../../../../components/common/UserIcon';
import AccountInfo from '../../../../components/common/AccountInfo';
import styles from './styles';
import Icon from '../../../../components/icons';
import Send from '../../../Send';
import Touchable from '../../../../components/animations/Touchable';

const WalletHeader = () => {
  const modalRef = useRef(null);
  const sendRef = useRef(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const openSend = () => {
    modalRef.current?.close();
    sendRef.current?.open();
  };

  const BUTTONS = [
    {
      image: <Icon name="deposit" />,
      colors: ['#FB5DC3', '#FDB943'],
      text: 'Deposit',
    },
    {
      image: <Icon name="send" />,
      colors: ['#36C3E9', '#CF6ED3'],
      text: 'Send',
      onPress: openSend,
    },
    {
      image: <Icon name="swap" />,
      colors: ['#09DF66', '#05DCC8'],
      text: 'Swap',
    },
  ];

  return (
    <>
      <Header
        left={<UserIcon size="small" icon="🔥" />}
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
              <ActionButton {...button} />
            ))}
          </View>
        </View>
      </Modal>

      <Send modalRef={sendRef} />
    </>
  );
};

export default WalletHeader;

const ActionButton = ({ image, text, colors, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={styles.button}>
      {image}
      <GradientText colors={colors} style={styles.text}>
        {text}
      </GradientText>
    </View>
  </Touchable>
);
