import { useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import UserIcon from '@/components/common/UserIcon';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import useDisableBack from '@/hooks/useDisableBack';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { getSession } from '@/redux/slices/walletconnect';
import Accounts from '@/screens/tabs/Profile/screens/Accounts';
import { useNavigation } from '@/utils/navigation';

import styles from './styles';

function WCInitialConnection() {
  const { params } = useRoute();
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { reset } = useNavigation();
  const { currentWallet } = useSelector(state => state.keyring);
  const [handleResponse, setHandleResponse] = useState(null);
  const [istTimedOut, setIsTimedOut] = useState(false);

  useDisableBack();
  const { meta, uri } = params;
  const { dappName, dappUrl, dappScheme, peerId, dappImageUrl } = meta || {};

  useEffect(() => {
    // Este timeout no funciona
    if (istTimedOut) {
      // TODO: Handle Error.
      closeScreen();
    }
  }, [istTimedOut]);

  useEffect(() => {
    try {
      const getRouteParams = async () => {
        const {
          routeParams: { callback },
          timedOut,
        } = await dispatch(getSession({ uri })).unwrap();
        setHandleResponse(() => callback);
        setIsTimedOut(timedOut);
      };
      getRouteParams();
    } catch (e) {
      console.log('GET ROUTE PARAMS', e);
    }
  }, []);

  const handleSuccess = useCallback(
    (success = false) => {
      if (handleResponse) {
        setTimeout(
          () =>
            handleResponse({
              approved: success,
              chainId: 1,
              accountAddress: 'approvalAccount.address',
              peerId,
              dappScheme,
              dappName,
              dappUrl,
            }),
          300
        );
      }
    },
    [
      'approvalAccount.address',
      handleResponse,
      peerId,
      dappScheme,
      dappName,
      dappUrl,
    ]
  );

  const onPress = () => {
    handleSuccess(true);
    closeScreen();
  };

  const onCancel = () => {
    closeScreen();
  };

  const gotoDapp = () => {
    Linking.openURL(dappUrl);
  };

  const closeScreen = () => {
    reset({
      index: 1,
      routes: [{ name: Routes.SWIPE_LAYOUT }],
    });
  };

  const handleChangeWallet = () => {
    modalRef?.current.open();
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {dappImageUrl ? (
            <Image source={{ uri: dappImageUrl }} style={styles.dappIcon} />
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
      <View style={styles.bottomContainer}>
        <View style={styles.changeWalletContainer}>
          <View style={styles.userContainer}>
            <UserIcon icon={currentWallet?.icon} size="small" />
            <Text style={[FontStyles.Normal, styles.user]}>
              {currentWallet?.name}
            </Text>
          </View>
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
