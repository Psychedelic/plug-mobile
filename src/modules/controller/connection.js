import { CONNECTION_STATUS, ERRORS } from '@/constants/walletconnect';
import { getApp, getApps, removeApp, setApps } from '@/modules/storageManager';
import Routes from '@/navigation/Routes';
import { walletConnectExecuteAndResponse } from '@/redux/slices/walletconnect';
import { validatePrincipalId } from '@/utils/ids';
import Navigation from '@/utils/navigation';
import { areAllElementsIn } from '@/utils/objects';
import {
  fetchCanistersInfo,
  initializeProtectedIds,
} from '@/utils/walletConnect';

const handlerAllowAgent = getState => async (opts, url, response) => {
  const keyring = getState()?.keyring?.instance;
  if (!response.noNewEvents) {
    const apps = await getApps(keyring?.currentWalletId.toString());
    const status =
      response.status === CONNECTION_STATUS.rejectedAgent
        ? CONNECTION_STATUS.accepted
        : response.status;
    const whitelist =
      response.status === CONNECTION_STATUS.accepted ? response.whitelist : [];

    const date = new Date().toISOString();

    const newApps = {
      ...apps,
      [url]: {
        ...apps[url],
        status: status || CONNECTION_STATUS.rejected,
        date,
        whitelist,
        events: [
          ...(apps[url]?.events || []),
          {
            status: status || CONNECTION_STATUS.rejected,
            date,
          },
        ],
      },
    };
    await setApps(keyring?.currentWalletId.toString(), newApps);
  }

  if (response?.status === CONNECTION_STATUS.accepted) {
    try {
      const publicKey = await keyring?.getPublicKey();
      return { result: publicKey };
    } catch (e) {
      return { error: ERRORS.SERVER_ERROR(e) };
    }
  } else {
    return { error: ERRORS.AGENT_REJECTED };
  }
};

const ConnectionModule = (dispatch, getState) => {
  const getConnectionData = {
    methodName: 'getConnectionData',
    handler: async (request, url) => {
      initializeProtectedIds();
      const keyring = getState().keyring?.instance;
      const walletId = keyring?.currentWalletId;

      const app = await getApp(walletId.toString(), url);
      if (app?.status === CONNECTION_STATUS.accepted) {
        if (!keyring?.isUnlocked) {
          // TODO: Show requestDonnectionData screen
          return;
        } else {
          dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              args: [app],
            })
          );
        }
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            args: [null],
          })
        );
      }
    },
    executor: (opts, app) => {
      if (app === null) {
        return { result: null };
      }
      const keyring = getState().keyring?.instance;
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
    handler: async (request, url) => {
      dispatch(
        walletConnectExecuteAndResponse({
          ...request,
          args: [url],
        })
      );
    },
    executor: async (opts, url) => {
      const keyring = getState().keyring?.instance;

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
    handler: async (request, metadata, whitelist, timeout, host) => {
      try {
        await initializeProtectedIds();
        const keyring = getState().keyring?.instance;
        const isValidWhitelist = Array.isArray(whitelist) && whitelist.length;
        if (!whitelist.every(canisterId => validatePrincipalId(canisterId))) {
          dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CANISTER_ID_ERROR,
            })
          );
          return;
        }

        const canistersInfo = isValidWhitelist
          ? await fetchCanistersInfo(whitelist)
          : {};

        const whitelistWithInfo = canistersInfo.reduce(
          (acum, info) => ({
            ...acum,
            [info.id]: { canisterId: info.id, ...info },
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
        const { executor: _executor, ...requestWithoutExecutor } = request;

        if (isValidWhitelist) {
          // Aca manda a la pantalla de Cannister List
          Navigation.handleAction(Routes.WALLET_CONNECT_FLOWS, {
            type: 'requestConnect',
            openAutomatically: true,
            request: requestWithoutExecutor,
            metadata,
            args: { whitelist: whitelistWithInfo, domainUrl },
            handleApproveArgs,
            handleDeclineArgs,
          });
        }
      } catch (e) {
        walletConnectExecuteAndResponse({
          ...request,
          error: ERRORS.SERVER_ERROR(e),
        });
      }
    },
    executor: handlerAllowAgent(getState),
  };

  const verifyWhitelist = {
    methodName: 'verifyWhitelist',
    handler: async (request, metadata, whitelist) => {
      const keyring = getState().keyring?.instance;

      if (!whitelist.every(canisterId => validatePrincipalId(canisterId))) {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            error: ERRORS.CANISTER_ID_ERROR,
          })
        );
        return;
      }

      const canisterInfo = fetchCanistersInfo(whitelist);

      const whitelistWithInfo = whitelist.reduce(
        (acum, canisterId) => ({
          ...acum,
          [canisterId]: { canisterId, ...canisterInfo[canisterId] },
        }),
        {}
      );

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
        const { executor: _executor, ...requestWithoutExecutor } = request;

        if (allWhitelisted) {
          await dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              args: handleApproveArgs,
            })
          );
        } else {
          Navigation.handleAction(Routes.WALLET_CONNECT_FLOWS, {
            type: 'requestConnect',
            openAutomatically: true,
            request: requestWithoutExecutor,
            metadata,
            args: { whitelist: whitelistWithInfo, domainUrl: metadata.url },
            handleApproveArgs,
            handleDeclineArgs,
          });
        }
      } else {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: handlerAllowAgent(getState),
  };

  return [getConnectionData, disconnect, requestConnect, verifyWhitelist];
};

export default ConnectionModule;
