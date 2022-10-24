import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ERRORS } from '@/constants/walletconnect';
import useDisableBack from '@/hooks/useDisableBack';
import {
  FlowsParams,
  WCFlowTypes,
  WCWhiteListItem,
} from '@/interfaces/walletConnect';
import { Container } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addConnectedApp } from '@/redux/slices/user';
import {
  addBridgeTimeout,
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
import { TRANSFER_METHOD_NAMES } from './utils';

const COMPONENTS = {
  [WCFlowTypes.transfer]: RequestTransfer,
  [WCFlowTypes.requestConnect]: RequestConnect,
  [WCFlowTypes.requestCall]: RequestCall,
  [WCFlowTypes.batchTransactions]: BatchTransactions,
};

function WCFlows() {
  useDisableBack();
  const { params } = useRoute();
  const dispatch = useAppDispatch();
  const { reset, navigate } = useNavigation();
  const [sendLoading, setSendLoading] = useState(false);
  const [wcTimeout, setWCTimeout] = useState(false);
  const {
    args,
    type,
    loading,
    metadata,
    requestId,
    canisterId,
    handleError,
    canisterInfo,
    handleApproveArgs,
    handleDeclineArgs,
  } = (params || {}) as FlowsParams;

  const request = useAppSelector(
    state => state.walletconnect.pendingCallRequests[requestId]
  );
  const principalId = useAppSelector(
    state => state.keyring?.currentWallet?.principal
  );
  const DisplayComponent = useMemo(() => COMPONENTS[type], [type]);
  const isTransfer =
    type === WCFlowTypes.transfer ||
    TRANSFER_METHOD_NAMES.includes(args?.methodName);

  useEffect(() => {
    if (wcTimeout) {
      navigate(Routes.WALLET_CONNECT_ERROR, {
        dappName: request?.dappName,
        dappUrl: request?.dappUrl,
      });
    }
  }, [wcTimeout]);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setWCTimeout(true);
      }, 20000);

      dispatch(addBridgeTimeout({ requestId, timeout }));
    }
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
        requestId,
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
      await handleAction({ error: ERRORS.SERVER_ERROR(e.message) });
    }
  }, [closeScreen, dispatch, handleAction]);

  const onConfirm = useCallback(async () => {
    return handleConfirmTransaction();
  }, [handleConfirmTransaction]);

  const onPressCancel = useCallback(() => onCancel(), [onCancel]);

  const onPressSend = useCallback(async () => {
    setSendLoading(true);
    if (type === WCFlowTypes.requestConnect) {
      const whiteListArray = Object.keys(args.whitelist).map(
        (key: string) => args.whitelist[key]
      ) as WCWhiteListItem[];

      dispatch(
        addConnectedApp({
          name: metadata.name,
          canisterList: whiteListArray,
          imageUri: metadata?.icons[0],
          lastConnection: new Date(Date.now()),
          account: principalId!,
        })
      );
    }

    try {
      await onConfirm();
    } finally {
      setSendLoading(false);
    }
  }, [onConfirm]);

  return (
    <Container>
      {loading || !request ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          {isTransfer && <RequestTransferHeader canisterId={canisterId} />}
          <View style={styles.showcaseContainer}>
            <DappInfo type={type} request={request} />
            <DisplayComponent
              args={args}
              request={request}
              metadata={metadata}
              canisterId={canisterId}
              canisterInfo={canisterInfo}
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
