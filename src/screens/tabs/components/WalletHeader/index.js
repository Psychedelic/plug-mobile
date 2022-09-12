import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import AccountInfo from '@/commonComponents/AccountInfo';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import UserIcon from '@/commonComponents/UserIcon';
import Icon from '@/components/icons';
import { Colors } from '@/constants/theme';
import { useDebounce } from '@/hooks/useDebounce';
import Routes from '@/navigation/Routes';
import Deposit from '@/screens/flows/Deposit';
import Send from '@/screens/flows/Send';

import ActionButton from '../ActionButton';
import styles from './styles';

const WalletHeader = () => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const sendRef = useRef(null);
  const depositRef = useRef(null);
  const { debounce } = useDebounce();
  const [navigated, setNavigated] = useState(false);
  const { currentWallet } = useSelector(state => state.keyring);
  const { reverseResolvedName } =
    useSelector(state => state.user?.icnsData) || {};

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

  const BUTTONS = useMemo(
    () => [
      {
        image: <Icon name="deposit" />,
        colors: [Colors.Rainbow.Red, Colors.Rainbow.Yellow],
        text: t('common.deposit'),
        onPress: openDeposit,
      },
      {
        image: <Icon name="send" />,
        colors: [Colors.Rainbow.Blue, Colors.Rainbow.Purple],
        text: t('common.send'),
        onPress: openSend,
      },
      {
        image: <Icon name="swap" />,
        colors: [Colors.Rainbow.Green, Colors.Rainbow.Teal],
        text: t('common.swap'),
        disabled: true,
      },
    ],
    []
  );

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
        center={<AccountInfo icnsName={reverseResolvedName} />}
        right={
          <Touchable onPress={openModal}>
            <Icon name="groupedActions" />
          </Touchable>
        }
      />
      <Modal modalRef={modalRef} adjustToContentHeight>
        <View style={styles.container}>
          <View style={styles.buttons}>
            {React.Children.toArray(
              BUTTONS.map(button => (
                <ActionButton {...button} key={button.text} />
              ))
            )}
          </View>
        </View>
      </Modal>
      <Send modalRef={sendRef} />
      <Deposit modalRef={depositRef} />
    </>
  );
};

export default WalletHeader;
