import { CONNECTION_STATUS, ERRORS } from '@/constants/walletconnect';
import { getApp, getApps, removeApp, setApps } from '@/modules/storageManager';
import Routes from '@/navigation/Routes';
import { walletConnectExecuteAndResponse } from '@/redux/slices/walletconnect';
import { validatePrincipalId } from '@/utils/ids';
import { navigate } from '@/utils/navigation';
import { areAllElementsIn } from '@/utils/objects';
import {
  fetchCanistersInfo,
  getWhitelistWithInfo,
  initializeProtectedIds,
  updateWhitelist,
} from '@/utils/walletConnect';

import KeyRing from '../keyring';

const handlerAllowAgent = getState => async (opts, url, response) => {
  const keyring = KeyRing.getInstance();
  const currentWalletId = keyring?.currentWalletId.toString();
  if (!response.noNewEvents) {
    const status =
      response.status === CONNECTION_STATUS.rejectedAgent
        ? CONNECTION_STATUS.accepted
        : response.status;
    const whitelist =
      response.status === CONNECTION_STATUS.accepted ? response.whitelist : [];

    updateWhitelist(whitelist, currentWalletId, status, url);
  }

  if (response?.status === CONNECTION_STATUS.accepted) {
    try {
      const publicKey = await keyring?.getPublicKey();
      return {
        result: {
          publicKey,
          whitelist: Object.keys(response.whitelist),
        },
      };
    } catch (e) {
      return { error: ERRORS.SERVER_ERROR(e.message) };
    }
  } else {
    return { error: ERRORS.AGENT_REJECTED };
  }
};

const ConnectionModule = (dispatch, getState) => {
  const getConnectionData = {
    methodName: 'getConnectionData',
    handler: async (requestId, url) => {
      initializeProtectedIds();
      const keyring = KeyRing.getInstance();
      const walletId = keyring?.currentWalletId;

      const app = await getApp(walletId.toString(), url);
      if (app?.status === CONNECTION_STATUS.accepted) {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            args: [app],
          })
        );
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            args: [null],
          })
        );
      }
    },
    executor: (opts, app) => {
      if (app === null) {
        return { result: null };
      }
      const keyring = KeyRing.getInstance();
      const walletId = keyring?.currentWalletId;
      const publicKey = keyring?.getPublicKey(walletId);

      const result = {
        host: app.host,
        timeout: app.timeout,
        whitelist: Object.keys(app.whitelist),
        publicKey,
      };

      return { result };
    },
  };
  const disconnect = {
    methodName: 'disconnect',
    handler: async (requestId, url) => {
      dispatch(
        walletConnectExecuteAndResponse({
          requestId,
          args: [url],
        })
      );
    },
    executor: async (opts, url) => {
      const keyring = KeyRing.getInstance();

      const removed = await removeApp(
        keyring?.currentWalletId?.toString(),
        url
      );

      if (!removed) {
        return { error: ERRORS.CONNECTION_ERROR };
      }
    },
  };

  const requestConnect = {
    methodName: 'requestConnect',
    handler: async (requestId, metadata, whitelist, timeout, host) => {
      try {
        await initializeProtectedIds();
        const keyring = KeyRing.getInstance();
        const isValidWhitelist = Array.isArray(whitelist) && whitelist.length;
        if (!whitelist.every(canisterId => validatePrincipalId(canisterId))) {
          dispatch(
            walletConnectExecuteAndResponse({
              requestId,
              error: ERRORS.CANISTER_ID_ERROR,
            })
          );
          return;
        }

        const canistersInfo = isValidWhitelist
          ? await fetchCanistersInfo(whitelist)
          : {};

        const whitelistWithInfo = canistersInfo
          .concat(whitelist.map(wh => ({ canisterId: wh })))
          .reduce(
            (acum, info) => ({
              ...acum,
              [info.canisterId]: { ...info, ...acum[info.canisterId] },
            }),
            {}
          );

        const { url: domainUrl, name, icons } = metadata;

        const date = new Date().toISOString();

        const apps = await getApps(keyring?.currentWalletId.toString());

        const newApps = {
          ...apps,
          [domainUrl]: {
            url: domainUrl,
            name,
            status: CONNECTION_STATUS.pending,
            icon: icons[0] || null,
            timeout,
            date,
            events: [...(apps[domainUrl]?.events || [])],
            whitelist: whitelistWithInfo,
            host,
          },
        };
        await setApps(keyring?.currentWalletId.toString(), newApps);

        const handleApproveArgs = [
          domainUrl,
          {
            status: CONNECTION_STATUS.accepted,
            whitelist: whitelistWithInfo,
          },
        ];

        const handleDeclineArgs = [
          domainUrl,
          {
            status: CONNECTION_STATUS.refused,
            whitelist: whitelistWithInfo,
          },
        ];
        if (isValidWhitelist) {
          const params = {
            type: 'requestConnect',
            openAutomatically: true,
            requestId,
            metadata,
            args: { whitelist: whitelistWithInfo, domainUrl },
            handleApproveArgs,
            handleDeclineArgs,
          };

          navigate(Routes.WALLET_CONNECT_FLOWS, params);
        }
      } catch (e) {
        walletConnectExecuteAndResponse({
          requestId,
          error: ERRORS.SERVER_ERROR(e.message),
        });
      }
    },
    executor: handlerAllowAgent(getState),
  };

  const allWhiteListed = {
    methodName: 'allWhiteListed',
    handler: async (requestId, metadata, whitelist) => {
      const keyring = KeyRing.getInstance();

      const app = await getApp(
        keyring?.currentWalletId.toString(),
        metadata.url
      );
      if (app?.status === CONNECTION_STATUS.accepted) {
        const areAllWhiteListed = areAllElementsIn(
          whitelist,
          app?.whitelist ? Object.keys(app?.whitelist) : []
        );

        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            args: [areAllWhiteListed],
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
    executor: async (opts, areAllWhiteListed) => {
      const keyring = KeyRing.getInstance();

      if (areAllWhiteListed) {
        const publicKey = await keyring?.getPublicKey();
        return { result: { allWhiteListed: areAllWhiteListed, publicKey } };
      }

      return { result: { allWhiteListed: areAllWhiteListed } };
    },
  };

  const verifyWhitelist = {
    methodName: 'verifyWhitelist',
    handler: async (requestId, metadata, whitelist) => {
      const keyring = KeyRing.getInstance();

      if (!whitelist.every(canisterId => validatePrincipalId(canisterId))) {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CANISTER_ID_ERROR,
          })
        );
        return;
      }

      const whitelistWithInfo = getWhitelistWithInfo(whitelist);

      const app = await getApp(
        keyring?.currentWalletId.toString(),
        metadata.url
      );
      if (app?.status === CONNECTION_STATUS.accepted) {
        const allWhitelisted = areAllElementsIn(
          whitelist,
          app?.whitelist ? Object.keys(app?.whitelist) : []
        );

        const handleApproveArgs = [
          metadata.url,
          {
            status: CONNECTION_STATUS.accepted,
            whitelist: whitelistWithInfo,
          },
        ];
        const handleDeclineArgs = [
          metadata.url,
          {
            status: CONNECTION_STATUS.refused,
            whitelist: whitelistWithInfo,
          },
        ];
        if (allWhitelisted) {
          await dispatch(
            walletConnectExecuteAndResponse({
              requestId,
              args: handleApproveArgs,
            })
          );
        } else {
          navigate(Routes.WALLET_CONNECT_FLOWS, {
            type: 'requestConnect',
            requestId,
            metadata,
            args: { whitelist: whitelistWithInfo, domainUrl: metadata.url },
            handleApproveArgs,
            handleDeclineArgs,
          });
        }
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: handlerAllowAgent(getState),
  };

  return [
    getConnectionData,
    disconnect,
    requestConnect,
    verifyWhitelist,
    allWhiteListed,
  ];
};

export default ConnectionModule;
