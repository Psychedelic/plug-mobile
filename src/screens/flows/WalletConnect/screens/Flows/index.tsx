import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
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
import styles from './styles';

const COMPONENTS = {
  [WCFlowTypes.transfer]: RequestTransfer,
  [WCFlowTypes.requestConnect]: RequestConnect,
  [WCFlowTypes.requestCall]: RequestCall,
  [WCFlowTypes.batchTransactions]: BatchTransactions,
};

function WCFlows() {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const { reset } = useNavigation<NavigationProp<RootStackParamList>>();
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
  } = (params || {}) as FlowsParams;

  const DisplayComponent = COMPONENTS[type];
  const isBatchTransactions = type === WCFlowTypes.batchTransactions;

  useDisableBack();

  useEffect(() => {
    if (wcTimeout) {
      // TODO: Handle Error.
      // Matt Ale
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
          <DappInfo type={type} request={request} />
          <DisplayComponent
            type={type}
            args={args}
            request={request}
            metadata={metadata}
          />
          <BottomContainer
            sendLoading={sendLoading}
            onPressSend={onPressSend}
            onPressCancel={onPressCancel}
            isBatchTransactions={isBatchTransactions}
          />
        </View>
      )}
    </Container>
  );
}

export default WCFlows;
