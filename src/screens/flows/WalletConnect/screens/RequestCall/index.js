import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  InteractionManager,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Plug from '@/assets/icons/il_white_plug.png';
import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { Container } from '@/layout';
import {
  removeCallRequestToApprove,
  walletConnectExecuteAndResponse,
  walletConnectRemovePendingRedirect,
} from '@/redux/slices/walletconnect';
import { useNavigation } from '@/utils/navigation';

import styles from '../../styles';

function RequestCall() {
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
              walletConnectExecuteAndResponse({
                peerId,
                requestId,
                approve: false,
              }),
            );
            dispatch(removeCallRequestToApprove(requestId));
          }
        }, 300);
      } catch (e) {
        console.log('error while handling cancel request', e);
        closeScreen(true);
      }
    },
    [closeScreen, dispatch, method, peerId, requestId],
  );

  const handleConfirmTransaction = useCallback(async () => {
    if (requestId) {
      await dispatch(
        walletConnectExecuteAndResponse({
          peerId,
          requestId,
          methodName: method,
          params: args,
          approve: true,
        }),
      );
      dispatch(removeCallRequestToApprove(requestId));
    }
    closeScreen(false);
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
    if (isAuthorizing) {
      return;
    }
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
          // TODO: changes on this screen after desings
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

export default RequestCall;
