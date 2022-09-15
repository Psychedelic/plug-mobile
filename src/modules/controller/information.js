import { CONNECTION_STATUS, ERRORS } from '@/constants/walletconnect';
import { getICNSData } from '@/redux/slices/keyring';
import { getBalance } from '@/redux/slices/user';
import { walletConnectExecuteAndResponse } from '@/redux/slices/walletconnect';

import { getApp } from '../storageManager';

const InformationModule = (dispatch, getState) => {
  const requestBalance = {
    methodName: 'requestBalance',
    handler: async (requestId, metadata, subaccount) => {
      const keyring = getState().keyring.instance;
      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        if (subaccount && Number.isNaN(parseInt(subaccount, 10))) {
          return dispatch(
            walletConnectExecuteAndResponse({
              requestId,
              error: ERRORS.CLIENT_ERROR('Invalid account id'),
            })
          );
        }
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            args: [subaccount],
          })
        );
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: async (opts, subaccount) => {
      const result = await dispatch(getBalance({ subaccount })).unwrap();
      return { result };
    },
  };
  const getPublicKey = {
    methodName: 'getPublicKey',
    handler: requestId => {
      dispatch(walletConnectExecuteAndResponse({ requestId, args: [] }));
    },
    executor: async opts => {
      try {
        const keyring = getState().keyring.instance;
        const publicKey = await keyring.getPublicKey(
          keyring.currentWalletId.toString()
        );
        return { result: publicKey };
      } catch (e) {
        return { error: ERRORS.SERVER_ERROR(e) };
      }
    },
  };
  const getPrincipal = {
    methodName: 'getPrincipal',
    handler: async (requestId, pageUrl) => {
      const keyring = getState().keyring.instance;
      const app = await getApp(keyring.currentWalletId.toString(), pageUrl);
      if (app.status === CONNECTION_STATUS.accepted) {
        dispatch(walletConnectExecuteAndResponse({ requestId, args: [] }));
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: opts => {
      const keyring = getState().keyring.instance;
      const currentWalletId = keyring?.currentWalletId;
      const principal = getState().keyring.wallets[currentWalletId].principal;
      return { result: principal };
    },
  };
  const getICNSInfo = {
    methodName: 'getICNSInfo',
    handler: async (requestId, metadata) => {
      const keyring = getState().keyring.instance;
      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        dispatch(walletConnectExecuteAndResponse({ requestId, args: [] }));
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: async opts => {
      const icnsData = await dispatch(getICNSData());
      return { result: icnsData };
    },
  };

  const isUnlock = {
    methodName: 'isUnlock',
    handler: () => {},
    executor: () => {
      try {
        const { isUnlocked } = getState().keyring;
        return { result: isUnlocked };
      } catch (e) {
        return { error: ERRORS.SERVER_ERROR(e) };
      }
    },
  };

  return [requestBalance, getPublicKey, getPrincipal, getICNSInfo, isUnlock];
};

export default InformationModule;
