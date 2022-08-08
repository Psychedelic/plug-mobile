import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ERRORS } from '@/constants/walletconnect';
import useDisableBack from '@/hooks/useDisableBack';
import { RootStackParamList } from '@/interfaces/navigation';
import { FlowsParams, WCFlowTypes } from '@/interfaces/walletConnect';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import {
  updateBridgeTimeout,
  walletConnectExecuteAndResponse,
} from '@/redux/slices/walletconnect';

import BatchTransactions from './components/BatchTransactions';
import BottomContainer from './components/BottomContainer';
import DappInfo from './components/DappInfo';
import RequestCall from './components/RequestCall';
import RequestConnect from './components/RequestConnect';
import RequestTransfer from './components/RequestTransfer';
import RequestTransferHeader from './components/RequestTransferHeader';
import styles from './styles';

const COMPONENTS = {
  [WCFlowTypes.transfer]: RequestTransfer,
  [WCFlowTypes.requestConnect]: RequestConnect,
  [WCFlowTypes.requestCall]: RequestCall,
  [WCFlowTypes.batchTransactions]: BatchTransactions,
};

function WCFlows() {
  useDisableBack();
  const { params } = useRoute();
  const dispatch = useDispatch();
  const { reset, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const [sendLoading, setSendLoading] = useState(false);
  const [wcTimeout, setWCTimeout] = useState(false);
  const {
    type,
    request,
    metadata,
    args,
    token,
    handleApproveArgs,
    handleDeclineArgs,
    handleError,
    loading,
  } = (params || {}) as FlowsParams;

  const DisplayComponent = useMemo(() => COMPONENTS[type], [type]);
  const isRequestTransfer = type === WCFlowTypes.transfer;
  console.tron.log(`t: ${type}`, params);

  useEffect(() => {
    if (wcTimeout) {
      // TODO: Matt Ale
      // navigate(Routes.WALLET_CONNECT_ERROR, {
      //   dappName: request?.dappName,
      //   dappUrl: request?.dappUrl,
      // });
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

  const handleAction = ({
    approve = false,
    error,
  }: {
    approve?: boolean;
    error?: { code: number; message: string };
  }) => {
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

  // TODO: Check if useCallback is needed.

  const onCancel = useCallback(
    async (error?: any) => {
      try {
        closeScreen();
        setTimeout(async () => {
          handleAction({ error });
        }, 300);
      } catch (e: any) {
        handleAction({ error: ERRORS.SERVER_ERROR(e.message) });
        closeScreen();
      }
    },
    [closeScreen, dispatch, handleAction, handleError]
  );

  const handleConfirmTransaction = useCallback(async () => {
    try {
      await handleAction({ approve: true });
    } catch (e: any) {
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
          {isRequestTransfer && <RequestTransferHeader token={token} />}
          <View style={styles.showcaseContainer}>
            <DappInfo type={type} request={request} />
            <DisplayComponent
              args={args}
              token={token}
              request={request}
              metadata={metadata}
            />
          </View>
          <BottomContainer
            type={type}
            sendLoading={sendLoading}
            onPressSend={onPressSend}
            onPressCancel={onPressCancel}
          />
        </View>
      )}
    </Container>
  );
}

export default WCFlows;
