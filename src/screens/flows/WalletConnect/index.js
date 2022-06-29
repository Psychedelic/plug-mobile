import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Plug from '@/assets/icons/il_white_plug.png';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Container } from '@/layout';
import { getSession } from '@/redux/slices/walletconnect';
import { useNavigation } from '@/utils/navigation';

import styles from './styles';

function WalletConnect() {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { meta, uri } = params;
  const { dappName, dappUrl, dappScheme, peerId } = meta || {};
  const [handleResponse, setHandleResponse] = useState(null);
  const [istTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    try {
      const getRouteParams = async () => {
        const { routeParams } = await dispatch(getSession({ uri })).unwrap();
        const { callback, timedOut } = routeParams;
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

  return (
    <Container>
      <View style={styles.container}>
        {istTimedOut ? (
          <Text style={styles.title}> TIMEDOUT </Text>
        ) : !Object.keys(meta).length ? (
          <ActivityIndicator size="large" />
        ) : (
          // TODO: changes on this screen after desings
          <>
            <Image source={Plug} style={styles.plugIcon} />
            <Text style={styles.title}>Wallet Connect</Text>
            <Text style={styles.title}>{`DAP URL: ${dappUrl}`}</Text>
            <Text style={styles.title}>{`DAP NAME: ${dappName}`}</Text>
            <RainbowButton
              buttonStyle={[styles.componentMargin, styles.buttonStyling]}
              text="Connect"
              onPress={onPress}
            />
          </>
        )}
      </View>
    </Container>
  );
}

export default WalletConnect;
