import { useRoute } from '@react-navigation/native';
import React, { Children, useCallback, useState } from 'react';
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
import { ERRORS } from '@/constants/walletconnect';
import { Container } from '@/layout';
import {
  walletConnectExecuteAndResponse,
  walletConnectRemovePendingRedirect,
} from '@/redux/slices/walletconnect';
import { useNavigation } from '@/utils/navigation';

import styles from '../styles';
import BatchTransactions from './BatchTransactions';
import RequestCall from './RequestCall';
import RequestConnect from './RequestConnect';
import RequestTransfer from './RequestTransfer';

const SCREENS = {
  transfer: RequestTransfer,
  requestConnect: RequestConnect,
  requestCall: RequestCall,
  batchTransactions: BatchTransactions,
};

function WalletConnectScreens() {
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const dispatch = useDispatch();
  const { params } = useRoute();
  const { goBack } = useNavigation();
  const {
    type,
    request,
    metadata,
    args,
    handleApprove,
    handleDecline,
    handleError,
    timedOut,
  } = params;
  const Screen = SCREENS[type];

  const closeScreen = useCallback(() => {
    goBack();
  }, [goBack]);

  const onCancel = useCallback(
    async error => {
      try {
        closeScreen(true);

        setTimeout(async () => {
          if (handleDecline) {
            handleDecline();
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
    [closeScreen, dispatch, handleDecline, handleError]
  );

  const handleConfirmTransaction = useCallback(async () => {
    try {
      if (handleApprove) {
        await handleApprove();
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
  }, [closeScreen, dispatch, handleApprove]);

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
        {timedOut ? (
          <Text style={styles.error}>TIMED OUT</Text>
        ) : !Object.keys(params).length ? (
          <ActivityIndicator size="large" />
        ) : (
          // TODO: changes on this screen after desings
          <>
            <Image source={Plug} style={styles.plugIcon} />
            <Text style={styles.title}>Wallet Connect</Text>
            <Screen metadata={metadata} request={request} args={args} />
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

export default WalletConnectScreens;
