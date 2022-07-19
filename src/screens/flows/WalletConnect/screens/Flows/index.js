import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ERRORS } from '@/constants/walletconnect';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import {
  updateBridgeTimeout,
  walletConnectExecuteAndResponse,
} from '@/redux/slices/walletconnect';
import { useNavigation } from '@/utils/navigation';

import BatchTransactions from './components/BatchTransactions';
import RequestCall from './components/RequestCall';
import RequestConnect from './components/RequestConnect';
import RequestTransfer from './components/RequestTransfer';
import styles from './styles';

const SCREENS = {
  transfer: RequestTransfer,
  requestConnect: RequestConnect,
  requestCall: RequestCall,
  batchTransactions: BatchTransactions,
};

// PANTALLAS, EJ: APPROVE CANNISTER LIST
function WCFlows() {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { goBack, reset } = useNavigation();
  const [sendLoading, setSendLoading] = useState(false);
  // Este timeout es por si wallet connect no nos responde, mostrar error
  const [wcTimeout, setWCTimeout] = useState(false);
  const {
    type,
    request,
    metadata,
    args,
    handleApproveArgs,
    handleDeclineArgs,
    handleError,
    loading,
  } = params || {};
  const Screen = SCREENS[type];

  useEffect(() => {
    console.log('entra a wcTimeout', wcTimeout);
    if (wcTimeout) {
      // TODO: Handle Error.
      reset({
        index: 1,
        routes: [{ name: Routes.TOKENS }],
      });
    }
  }, [wcTimeout]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWCTimeout(true);
    }, 20000);
    dispatch(updateBridgeTimeout({ timeout }));

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleAction = (approve = false) => {
    dispatch(
      walletConnectExecuteAndResponse({
        ...request,
        args: approve ? handleApproveArgs : handleDeclineArgs,
      })
    );
  };

  // que onda el true o el false de closeScreen?
  const closeScreen = useCallback(() => {
    goBack();
    // REFACTOR
    // reset({
    //   index: 1,
    //   routes: [{ name: Routes.TOKENS }],
    // });
  }, [goBack]);

  const onCancel = useCallback(
    async error => {
      try {
        closeScreen(true);
        setTimeout(async () => {
          if (handleAction) {
            // por que el if?
            handleAction();
          }
        }, 300);
      } catch (e) {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            error: ERRORS.SERVER_ERROR(e.message),
          })
        );
        closeScreen(true);
      }
    },
    [closeScreen, dispatch, handleAction, handleError]
  );

  const handleConfirmTransaction = useCallback(async () => {
    try {
      if (handleAction) {
        await handleAction(true);
      }
    } catch (e) {
      await dispatch(
        walletConnectExecuteAndResponse({
          ...request,
          error: ERRORS.SERVER_ERROR(e),
        })
      );
    }
    closeScreen(false);
  }, [closeScreen, dispatch, handleAction]);

  const onConfirm = useCallback(async () => {
    return handleConfirmTransaction();
  }, [handleConfirmTransaction]);

  const onPressCancel = useCallback(() => onCancel(), [onCancel]);

  const onPressSend = useCallback(async () => {
    // onConfirm can change depending on the flow type
    setSendLoading(true);
    try {
      await onConfirm();
    } finally {
      setSendLoading(false);
    }
  }, [onConfirm]);

  return (
    <Container>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <Screen
          args={args}
          request={request}
          metadata={metadata}
          sendLoading={sendLoading}
          onPressSend={onPressSend}
          onPressCancel={onPressCancel}
        />
        // Poner botones?
      )}
    </Container>
  );
}

export default WCFlows;
