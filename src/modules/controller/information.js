import { CONNECTION_STATUS, ERRORS } from '@/constants/walletconnect';
import { getBalance, getICNSData } from '@/redux/slices/user';
import { walletConnectExecuteAndResponse } from '@/redux/slices/walletconnect';

import { getApp } from '../storageManager';

const InformationModule = (dispatch, getState) => {
  const requestBalance = {
    methodName: 'requestBalance',
    handler: async (request, metadata, subaccount) => {
      const keyring = getState().keyring.instance;
      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        if (subaccount && Number.isNaN(parseInt(subaccount, 10))) {
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CLIENT_ERROR('Invalid account id'),
            })
          );
        }
        return dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            args: [subaccount],
          })
        );
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
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
    handler: request => {
      dispatch(walletConnectExecuteAndResponse({ ...request, args: [] }));
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
    handler: async (request, pageUrl) => {
      const keyring = getState().keyring.instance;
      const app = await getApp(keyring.currentWalletId.toString(), pageUrl);
      if (app.status === CONNECTION_STATUS.accepted) {
        dispatch(walletConnectExecuteAndResponse({ ...request, args: [] }));
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
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
    handler: async (request, metadata) => {
      const keyring = getState().keyring.instance;
      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        dispatch(walletConnectExecuteAndResponse({ ...request, args: [] }));
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: async opts => {
      const icnsData = await dispatch(getICNSData({ refresh: true }));
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
