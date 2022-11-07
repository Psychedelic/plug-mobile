import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import AccountInfo from '@/commonComponents/AccountInfo';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import UserIcon from '@/commonComponents/UserIcon';
import { Colors } from '@/constants/theme';
import { useDebounce } from '@/hooks/useDebounce';
import Routes from '@/navigation/Routes';
import { useAppSelector } from '@/redux/hooks';
import Deposit from '@/screens/flows/Deposit';
import Send from '@/screens/flows/Send';

import ActionButton from '../ActionButton';
import DepositIcon from './assets/Deposit.png';
import GroupedActionsIcon from './assets/GroupedActions.png';
import SendIcon from './assets/Send.png';
import SwapIcon from './assets/Swap.png';
import styles from './styles';

const WalletHeader = () => {
  const { t } = useTranslation();
  const modalRef = useRef(null);
  const sendRef = useRef(null);
  const depositRef = useRef(null);
  const { debounce } = useDebounce();
  const [navigated, setNavigated] = useState(false);
  const { currentWallet } = useAppSelector(state => state.keyring);

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
        image: <Image source={DepositIcon} />,
        colors: [Colors.Rainbow.Red, Colors.Rainbow.Yellow],
        text: t('common.deposit'),
        onPress: openDeposit,
      },
      {
        image: <Image source={SendIcon} />,
        colors: [Colors.Rainbow.Blue, Colors.Rainbow.Purple],
        text: t('common.send'),
        onPress: openSend,
      },
      {
        image: <Image source={SwapIcon} />,
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
        center={<AccountInfo />}
        right={
          <Touchable onPress={openModal}>
            <Image source={GroupedActionsIcon} />
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
