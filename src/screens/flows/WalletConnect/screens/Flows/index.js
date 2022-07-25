import { useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import Button from '@/components/buttons/Button';
import RainbowButton from '@/components/buttons/RainbowButton';
import { FontStyles } from '@/constants/theme';
import { Colors } from '@/constants/theme';
import { ERRORS } from '@/constants/walletconnect';
import useDisableBack from '@/hooks/useDisableBack';
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

const COMPONENTS = {
  transfer: RequestTransfer,
  requestConnect: RequestConnect,
  requestCall: RequestCall,
  batchTransactions: BatchTransactions,
};

function WCFlows() {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { reset } = useNavigation();
  const [sendLoading, setSendLoading] = useState(false);
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
  const dappImage = request?.args[0]?.icons[0];
  const DisplayComponent = COMPONENTS[type];

  useDisableBack();

  useEffect(() => {
    if (wcTimeout) {
      // TODO: Handle Error.
      // closeScreen();
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

  const handleAction = ({ approve = false, error = false }) => {
    const handleActionParams = {
      ...(error
        ? { error }
        : { args: approve ? handleApproveArgs : handleDeclineArgs }),
    };

    dispatch(
      walletConnectExecuteAndResponse({
        ...request,
        ...handleActionParams,
        onSuccess: () => {
          closeScreen();
        },
      })
    );
  };

  const closeScreen = () => {
    reset({
      index: 1,
      routes: [{ name: Routes.SWIPE_LAYOUT }],
    });
  };

  const onCancel = useCallback(
    async error => {
      try {
        closeScreen();
        setTimeout(async () => {
          handleAction({ error });
        }, 300);
      } catch (e) {
        handleAction({ error: ERRORS.SERVER_ERROR(e.message) });
        closeScreen();
      }
    },
    [closeScreen, dispatch, handleAction, handleError]
  );

  const handleConfirmTransaction = useCallback(async () => {
    try {
      await handleAction({ approve: true });
    } catch (e) {
      await handleAction({ error: ERRORS.SERVER_ERROR(e) });
    }
  }, [closeScreen, dispatch, handleAction]);

  const onConfirm = useCallback(async () => {
    return handleConfirmTransaction();
  }, [handleConfirmTransaction]);

  const onPressCancel = useCallback(() => onCancel(), [onCancel]);

  const onPressSend = useCallback(async () => {
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
        <View style={styles.container}>
          <View style={styles.backgroundLogo}>
            <Image source={{ uri: dappImage }} style={styles.logo} />
          </View>
          <Text style={[FontStyles.Title, styles.dappName]}>
            {request?.dappName}
          </Text>
          <Text style={[FontStyles.NormalGray, styles.subtitle]}>
            {t('walletConnect.cannisterPermission')}
          </Text>
          <DisplayComponent args={args} request={request} metadata={metadata} />
          <View style={styles.bottomContainer}>
            <LinearGradient
              colors={[Colors.Transparent, Colors.Black.Primary]}
              style={styles.gradient}
            />
            <View style={styles.buttonContainer}>
              <Button
                text={t('walletConnect.decline')}
                buttonStyle={styles.buttonStyle}
                onPress={onPressCancel}
              />
              <RainbowButton
                loading={sendLoading}
                text={t('walletConnect.allow')}
                buttonStyle={styles.buttonStyle}
                onPress={onPressSend}
                // Hacer que para patch sea Confirm
              />
            </View>
          </View>
        </View>
      )}
    </Container>
  );
}

export default WCFlows;
