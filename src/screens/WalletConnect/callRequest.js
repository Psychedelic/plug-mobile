import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import RainbowButton from '../../components/buttons/RainbowButton';
import Container from '../../components/common/Container';
import Plug from '../../assets/icons/il_white_plug.png';
import styles from './styles';
import { useNavigation } from '../../helpers/navigation';
import { walletConnectHandleMethod } from '../../helpers/walletConnect';
import {
  removeCallRequestToApprove,
  walletConnectRemovePendingRedirect,
  walletConnectSendStatus,
} from '../../redux/slices/walletconnect';
import Button from '../../components/buttons/Button';

function WalletConnect() {
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const {
    transactionDetails: {
      dappName,
      dappScheme,
      dappUrl,
      payload: { method, params: args },
      peerId,
      requestId,
    },
  } = params;

  const pendingRedirect = useSelector(
    ({ walletconnect }) => walletconnect.pendingRedirect,
  );

  const closeScreen = useCallback(
    canceled => {
      goBack();

      if (pendingRedirect) {
        InteractionManager.runAfterInteractions(() => {
          let type = 'sign';

          if (canceled) {
            type = `${type}-canceled`;
          }
          dispatch(walletConnectRemovePendingRedirect(type, dappScheme));
        });
      }
    },
    [goBack, pendingRedirect, , method, dappScheme, dispatch],
  );

  const onCancel = useCallback(
    async error => {
      try {
        closeScreen(true);

        setTimeout(async () => {
          if (requestId) {
            await dispatch(
              walletConnectSendStatus(peerId, requestId, {
                error: error || 'User cancelled the request',
              }),
            );
            dispatch(removeCallRequestToApprove(requestId));
          }
        }, 300);
      } catch (error) {
        console.log('error while handling cancel request', error);
        closeScreen(true);
      }
    },
    [closeScreen, dispatch, method, peerId, requestId],
  );

  const handleConfirmTransaction = useCallback(async () => {
    let response = null;

    try {
      response = await walletConnectHandleMethod(method, args, dispatch);
    } catch (e) {
      console.log(`Error while ${method} transaction`, e);
    }

    const { result, error } = response;
    if (result) {
      if (requestId) {
        dispatch(removeCallRequestToApprove(requestId));
        await dispatch(
          walletConnectSendStatus({ peerId, requestId, response }),
        );
      }
      closeScreen(false);
    } else {
      try {
        console.log('Error with WC transaction. See previous logs...');
        const dappInfo = {
          dappName,
          dappScheme,
          dappUrl,
        };
        console.log('Dapp info:', dappInfo);
        console.log('Request info:', {
          method,
          params,
        });
      } catch (e) {}

      await onCancel(error);
    }
  }, [
    method,
    params,
    requestId,
    dappName,
    dispatch,
    peerId,
    dappScheme,
    dappUrl,
  ]);

  const onConfirm = useCallback(async () => {
    return handleConfirmTransaction();
  }, [handleConfirmTransaction]);

  const onPressSend = useCallback(async () => {
    if (isAuthorizing) return;
    setIsAuthorizing(true);
    try {
      await onConfirm();
      setIsAuthorizing(false);
    } catch (error) {
      setIsAuthorizing(false);
    }
  }, [isAuthorizing, onConfirm]);

  const onPressCancel = useCallback(() => onCancel(), [onCancel]);

  return (
    <Container>
      <View style={styles.container}>
        {!Object.keys(params).length ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Image source={Plug} style={styles.plugIcon} />
            <Text style={styles.title}>Wallet Connect</Text>
            <Text style={styles.text}>{`DAP URL: ${dappUrl}`}</Text>
            <Text style={styles.text}>{`DAP NAME: ${dappName}`}</Text>
            <Text style={styles.text}>{`METHOD: ${method}`}</Text>

            <RainbowButton
              buttonStyle={[styles.componentMargin, styles.buttonStyling]}
              text="Approve"
              onPress={onPressSend}
            />
            <Button
              buttonStyle={[styles.componentMargin, styles.buttonStyling]}
              text="Cancel"
              onPress={onPressCancel}
            />
          </>
        )}
      </View>
    </Container>
  );
}

export default WalletConnect;
