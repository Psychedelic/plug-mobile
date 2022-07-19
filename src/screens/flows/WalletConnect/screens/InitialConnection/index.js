import { useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Plug from '@/assets/icons/il_white_plug.png';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { FontStyles } from '@/constants/theme';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { getSession } from '@/redux/slices/walletconnect';
import { useNavigation } from '@/utils/navigation';

import styles from './styles';

// PANTALLA DE INICIO, CONNECT. Routes.WALLET_CONNECT_INITAL_CONNECTION
function WCInitialConnection() {
  const { goBack, reset } = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { meta, uri } = params;
  const { dappName, dappUrl, dappScheme, peerId } = meta || {};
  const [handleResponse, setHandleResponse] = useState(null);
  // Timeout de que el usuario no acepto la conexion entonces hay que sacarlo de la pantalla
  const [istTimedOut, setIsTimedOut] = useState(false);

  // Este timeout no funciona
  console.log('istTimedOut', istTimedOut);

  useEffect(() => {
    if (istTimedOut) {
      // Capaz mostrar un Error o algun mensaje.
      reset({
        index: 1,
        routes: [{ name: Routes.TOKENS }],
      });
    }
  }, [istTimedOut]);

  useEffect(() => {
    try {
      const getRouteParams = async () => {
        const { routeParams, timedOut } = await dispatch(
          getSession({ uri })
        ).unwrap();
        const { callback } = routeParams;

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
    goBack();
  };

  const onCancel = () => {
    goBack();
  };

  const gotoDapp = () => {
    Linking.openURL(dappUrl);
  };

  return (
    <Container>
      <View style={styles.container}>
        <Image source={Plug} style={styles.plugIcon} />
        <Text style={FontStyles.Title2}>{t('walletConnect.connectTitle')}</Text>
        <Text style={[FontStyles.NormalGray, styles.subtitle]}>
          {t('walletConnect.connectTo')}
          <Text onPress={gotoDapp} style={styles.validText}>
            {dappName}
          </Text>
          {t('common.questionMark')}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <RainbowButton
          onPress={onPress}
          text={t('walletConnect.connect')}
          buttonStyle={styles.rainbowButton}
        />
        <Button
          onPress={onCancel}
          text={t('common.cancel')}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </Container>
  );
}

export default WCInitialConnection;
