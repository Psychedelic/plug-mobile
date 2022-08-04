import { useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import useDisableBack from '@/hooks/useDisableBack';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { getSession } from '@/redux/slices/walletconnect';
import Accounts from '@/screens/tabs/Profile/screens/Accounts';
import { useNavigation } from '@/utils/navigation';

import UserShowcase from '../Flows/components/UserShowcase';
import styles from './styles';

function WCInitialConnection() {
  useDisableBack();
  const { params } = useRoute();
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const { reset } = useNavigation();
  const { currentWallet } = useSelector(state => state.keyring);

  const [handleResponse, setHandleResponse] = useState(null);
  const [connectLoading, setConnectLoading] = useState(false);

  const { meta, uri } = params;
  const { dappName, dappUrl, dappScheme, peerId, dappImageUrl } = meta || {};

  useEffect(() => {
    try {
      const getRouteParams = async () => {
        const {
          routeParams: { callback },
        } = await dispatch(getSession({ uri })).unwrap();
        setHandleResponse(() => callback);
      };
      getRouteParams();
    } catch (e) {
      // TODO: handle error.
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
              accountAddress: currentWallet.principal,
              peerId,
              dappScheme,
              dappName,
              dappUrl,
            }),
          300
        );
      }
    },
    [handleResponse, peerId, dappScheme, dappName, currentWallet, dappUrl]
  );

  const onPress = () => {
    setConnectLoading(true);
    handleSuccess(true);
  };

  const onCancel = () => {
    setConnectLoading(false);
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
        {/* Change to DappInfo */}
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
          <UserShowcase currentWallet={currentWallet} />
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
