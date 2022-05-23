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
  console.log('HANDLER allow Agent', response);
  const keyring = getState()?.keyring?.instance;
  if (!response.noNewEvents) {
    getApps(keyring?.currentWalletId.toString(), async (apps = {}) => {
      const status =
        response.status === CONNECTION_STATUS.rejectedAgent
          ? CONNECTION_STATUS.accepted
          : response.status;
      const whitelist =
        response.status === CONNECTION_STATUS.accepted
          ? response.whitelist
          : [];

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
      setApps(keyring?.currentWalletId.toString(), newApps);
    });
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

      getApp(walletId.toString(), url, async (app = {}) => {
        if (app?.status === CONNECTION_STATUS.accepted) {
          if (!this.keyring?.isUnlocked) {
            // TODO: Show requestDonnectionData screen
            return;
          } else {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [app],
              }),
            );
          }
        } else {
          dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              args: [null],
            }),
          );
        }
      });
    },
    executor: (opts, app) => {
      if (app === null) {
        return { result: null };
      }
      const keyring = getState().keyring?.instance;
      const walletId = this.keyring?.currentWalletId;
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
        }),
      );
    },
    executor: (opts, url) => {
      removeApp(this.keyring?.currentWalletId?.toString(), url, removed => {
        if (!removed) {
          return { error: ERRORS.CONNECTION_ERROR };
        }
      });
    },
  };

  const requestConnect = {
    methodName: 'requestConnect',
    handler: async (request, metadata, whitelist, timeout, host) => {
      try {
        const isValidWhitelist = Array.isArray(whitelist) && whitelist.length;
        if (!whitelist.every(canisterId => validatePrincipalId(canisterId))) {
          dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CANISTER_ID_ERROR,
            }),
          );
          return;
        }

        const { url: domainUrl, name, icons } = metadata;

        const date = new Date().toISOString();

        getApp(this.keyring?.currentWalletId.toString(), (apps = {}) => {
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
              whitelist,
              host,
            },
          };
          setApps(this.keyring?.currentWalletId.toString(), newApps);
        });

        const handleApprove = () => {
          dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              args: [
                domainUrl,
                { status: CONNECTION_STATUS.accepted, whitelist },
              ],
            }),
          );
        };
        const handleDecline = () => {
          dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              args: [
                domainUrl,
                { status: CONNECTION_STATUS.refused, whitelist },
              ],
            }),
          );
        };

        if (isValidWhitelist) {
          Navigation.handleAction(Routes.WALLET_CONNECT_SCREENS, {
            type: 'requestConnect',
            openAutomatically: true,
            request,
            metadata,
            args: { whitelist, domainUrl },
            handleApprove,
            handleDecline,
          });
        } else {
          // TODO: Show connectScreen
          Navigation.handleAction(Routes.WALLET_CONNECT_SCREENS, {
            type: 'requestConnect',
            openAutomatically: true,
            request,
            metadata,
            args: { whitelist, domainUrl },
            handleApprove,
            handleDecline,
          });
        }
      } catch (e) {
        console.log('requestConnectHandler error', e);
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
      if (!whitelist.every(canisterId => validatePrincipalId(canisterId))) {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            error: ERRORS.CANISTER_ID_ERROR,
          }),
        );
        return;
      }

      getApps(this.keyring?.currentWalletId.toString(), async (apps = {}) => {
        const app = apps?.[metadata.url] || {};
        if (app?.status === CONNECTION_STATUS.accepted) {
          const allWhitelisted = areAllElementsIn(
            whitelist,
            app?.whitelist ? Object.keys(app?.whitelist) : [],
          );

          if (allWhitelisted) {
            if (!this.keyring.isUnlocked) {
              // TODO: Show allowAgent screen
            }
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [metadata.url, { status: CONNECTION_STATUS.accepted }],
              }),
            );
          } else {
            // TODO: Show allowAgent screen
          }
        } else {
          dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CONNECTION_ERROR,
            }),
          );
        }
      });
    },
    executor: handlerAllowAgent(getState),
  };

  return [getConnectionData, disconnect, requestConnect, verifyWhitelist];
};

export default ConnectionModule;
