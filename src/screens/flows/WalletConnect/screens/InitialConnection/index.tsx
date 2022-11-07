import { t } from 'i18next';
import React, { useCallback, useRef, useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import useDisableBack from '@/hooks/useDisableBack';
import { ScreenProps } from '@/interfaces/navigation';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  walletConnectRejectSession,
  walletConnectRemovePendingRedirect,
} from '@/redux/slices/walletconnect';
import Accounts from '@/screens/tabs/Profile/modals/Accounts';
import { responseSessionRequest } from '@/utils/walletConnect';

import UserShowcase from '../Flows/components/UserShowcase';
import styles from './styles';

function WCInitialConnection({
  route,
  navigation,
}: ScreenProps<Routes.WALLET_CONNECT_INITIAL_CONNECTION>) {
  useDisableBack();
  const modalRef = useRef<Modalize>(null);
  const dispatch = useAppDispatch();
  const { currentWallet } = useAppSelector(state => state.keyring);
  const { bottom } = useSafeAreaInsets();

  const [connectLoading, setConnectLoading] = useState(false);

  const { dappName, dappUrl, dappScheme, peerId, imageUrl, requestId } =
    route?.params;

  const handleSuccess = useCallback(
    (success = false) => {
      setTimeout(
        () =>
          responseSessionRequest(
            {
              approved: success,
              accountAddress: currentWallet?.principal,
              ...route?.params,
            },
            dispatch
          ),
        300
      );
    },
    [peerId, dappScheme, dappName, currentWallet, dappUrl]
  );

  const onPress = () => {
    setConnectLoading(true);
    handleSuccess(true);
  };

  const onCancel = () => {
    closeScreen();
    setConnectLoading(false);
    dispatch(walletConnectRejectSession({ peerId }));
    dispatch(walletConnectRemovePendingRedirect({ requestId }));
  };

  const gotoDapp = () => {
    Linking.openURL(dappUrl);
  };

  const closeScreen = () => {
    navigation.reset({
      index: 1,
      routes: [{ name: Routes.SWIPE_LAYOUT }],
    });
  };

  const handleChangeWallet = () => modalRef?.current?.open();

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.dappIcon} />
          ) : (
            <Icon name="connectIcon" style={styles.defaultIcon} />
          )}
        </View>
        <Text style={FontStyles.Title2}>{t('walletConnect.connectTitle')}</Text>
        <Text style={[FontStyles.NormalGray, styles.subtitle]}>
          {t('walletConnect.connectTo')}
          <Text onPress={gotoDapp} style={styles.validText}>
            {dappName}
          </Text>
          {t('common.questionMark')}
        </Text>
      </View>
      <View style={[styles.bottomContainer, !!bottom && styles.extraMargin]}>
        <View style={styles.changeWalletContainer}>
          <UserShowcase currentWallet={currentWallet!} />
          <Text
            onPress={handleChangeWallet}
            style={[FontStyles.NormalGray, styles.onlyValid]}>
            {t('walletConnect.changeWallet')}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={onCancel}
            text={t('common.cancel')}
            buttonStyle={styles.buttonStyle}
          />
          <RainbowButton
            onPress={onPress}
            loading={connectLoading}
            text={t('walletConnect.connect')}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
      <Accounts modalRef={modalRef} />
    </Container>
  );
}

export default WCInitialConnection;
