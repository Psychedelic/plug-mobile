import { blobFromBuffer, blobToUint8Array } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { randomUUID } from 'crypto';

import { XTC_FEE } from '@/constants/addresses';
import { CYCLES_PER_TC, E8S_PER_ICP } from '@/constants/assets';
import { ICP_CANISTER_ID } from '@/constants/canister';
import { CONNECTION_STATUS, ERRORS } from '@/constants/walletconnect';
import {
  getApp,
  getBatchTransactions,
  getProtectedIds,
  setBatchTransactions,
} from '@/modules/storageManager';
import Routes from '@/navigation/Routes';
import { burnXtc, getBalance, sendToken } from '@/redux/slices/user';
import { walletConnectExecuteAndResponse } from '@/redux/slices/walletconnect';
import { getToken } from '@/utils/assets';
import Navigation from '@/utils/navigation';
import { base64ToBuffer, bufferToBase64 } from '@/utils/utilities';
import {
  generateRequestInfo,
  validateBatchTx,
  validateBurnArgs,
  validateTransactions,
  validateTransferArgs,
} from '@/utils/walletConnect';

const TransactionModule = (dispatch, getState) => {
  const requestTransfer = {
    methodName: 'requestTransfer',
    handler: async (request, metadata, args) => {
      const keyring = getState().keyring?.instance;

      getApp(keyring.currentWalletId.toString(), metadata.url, app => {
        if (app.status === CONNECTION_STATUS.accepted) {
          const argsError = validateTransferArgs(args);
          if (argsError) {
            return dispatch(
              walletConnectExecuteAndResponse({ ...request, error: argsError }),
            );
          }

          const handleApprove = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ ...args, approve: true }],
              }),
            );
          };

          const handleDecline = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ ...args, approve: false }],
              }),
            );
          };

          Navigation.handleAction(Routes.WALLET_CONNECT_SCREENS, {
            type: 'transfer',
            openAutomatically: true,
            request,
            metadata,
            args,
            handleApprove,
            handleDecline,
          });
        } else {
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CONNECTION_ERROR,
            }),
          );
        }
      });
    },
    executor: async (opts, { approve, amount, ...args }) => {
      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }
      const assets = await dispatch(getBalance());
      const parsedAmount = amount / E8S_PER_ICP;
      if (assets?.[0].amount > parsedAmount) {
        const response = await dispatch(
          sendToken({
            ...args,
            amount: parsedAmount,
            canisterId: ICP_CANISTER_ID,
          }),
        );

        if (response.error) {
          return { error: ERRORS.SERVER_ERROR(response.error) };
        }

        return { result: response };
      } else {
        return { error: ERRORS.BALANCE_ERROR };
      }
    },
  };

  const requestTransferToken = {
    methodName: 'requestTransferToken',
    handler: async (request, metadata, args) => {
      const keyring = getState().keyring?.instance;

      getApp(keyring.currentWalletId.toString(), metadata.url, app => {
        if (app.status === CONNECTION_STATUS.accepted) {
          const argsError = validateTransferArgs(args);
          if (argsError) {
            return dispatch(
              walletConnectExecuteAndResponse({ ...request, error: argsError }),
            );
          }

          const handleApprove = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ ...args, approve: true }],
              }),
            );
          };

          const handleDecline = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ ...args, approve: false }],
              }),
            );
          };

          Navigation.handleAction(Routes.WALLET_CONNECT_SCREENS, {
            type: 'transfer',
            openAutomatically: true,
            request,
            metadata,
            args,
            handleApprove,
            handleDecline,
          });
        } else {
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CONNECTION_ERROR,
            }),
          );
        }
      });
    },
    executor: async (opts, { approve, amount, ...args }) => {
      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }
      const assets = await dispatch(getBalance());
      const token = getToken(args.token, assets);

      if (!token) {
        return { error: ERRORS.TOKEN_NOT_FOUND };
      }

      if (token.amount > amount) {
        const response = await dispatch(
          sendToken({
            ...args,
            amount,
            canisterId: token.canisterId,
          }),
        );

        if (response.error) {
          return { error: ERRORS.SERVER_ERROR(response.error) };
        }

        return { result: response };
      } else {
        return { error: ERRORS.BALANCE_ERROR };
      }
    },
  };

  const requestBurnXTC = {
    methodName: 'requestBurnXTC',
    handler: async (request, metadata, args) => {
      const keyring = getState().keyring?.instance;

      getApp(keyring.currentWalletId.toString(), metadata.url, app => {
        if (app.status === CONNECTION_STATUS.accepted) {
          const argsError = validateBurnArgs(args);
          if (argsError) {
            return dispatch(
              walletConnectExecuteAndResponse({ ...request, error: argsError }),
            );
          }

          const handleApprove = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ ...args, approve: true }],
              }),
            );
          };

          const handleDecline = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ ...args, approve: false }],
              }),
            );
          };

          Navigation.handleAction(Routes.WALLET_CONNECT_SCREENS, {
            type: 'burnXTC',
            openAutomatically: true,
            request,
            metadata,
            args,
            handleApprove,
            handleDecline,
          });
        } else {
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CONNECTION_ERROR,
            }),
          );
        }
      });
    },
    executor: async (opts, { approve, amount, ...args }) => {
      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }
      const assets = await dispatch(getBalance());
      const xtcAmount =
        assets?.[this.DEFAULT_CURRENCY_MAP.XTC]?.amount * CYCLES_PER_TC;
      const parsedAmount = amount / CYCLES_PER_TC;

      if (xtcAmount - XTC_FEE > amount) {
        const response = await dispatch(
          burnXtc({
            ...args,
            amount: parsedAmount,
          }),
        );

        if (response.error) {
          return { error: ERRORS.SERVER_ERROR(response.error) };
        }

        return { result: response?.ok };
      } else {
        return { error: ERRORS.BALANCE_ERROR };
      }
    },
  };

  const batchTransaction = {
    methodName: 'batchTransaction',
    handler: async (request, metadata, transactions) => {
      const keyring = getState().keyring?.instance;

      getApp(keyring.currentWalletId.toString(), metadata.url, app => {
        if (app.status === CONNECTION_STATUS.accepted) {
          const argsError = validateTransactions(transactions);
          if (argsError) {
            return dispatch(
              walletConnectExecuteAndResponse({ ...request, error: argsError }),
            );
          }

          const handleApprove = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ transactions, approve: true }],
              }),
            );
          };

          const handleDecline = () => {
            dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                args: [{ transactions, approve: false }],
              }),
            );
          };

          Navigation.handleAction(Routes.WALLET_CONNECT_SCREENS, {
            type: 'batchTransactions',
            openAutomatically: true,
            request,
            metadata,
            args: transactions,
            handleApprove,
            handleDecline,
          });
        } else {
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CONNECTION_ERROR,
            }),
          );
        }
      });
    },
    executor: async (opts, { approve, transactions }) => {
      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }

      getBatchTransactions(async (err, batchTransactions) => {
        if (err) {
          return { error: ERRORS.SERVER_ERROR(err) };
        }
        const newBatchTransactionId = randomUUID();
        const updatedBatchTransactions = {
          ...batchTransactions,
          [newBatchTransactionId]: transactions.map(tx => ({
            canisterId: tx.canisterId,
            methodName: tx.methodName,
            args: tx.arguments,
          })),
        };
        setBatchTransactions(updatedBatchTransactions);

        return { status: true, txId: newBatchTransactionId };
      });
    },
  };

  const requestCall = {
    methodName: 'requestCall',
    handler: async (request, metadata, args, batchTxId) => {
      const keyring = getState().keyring?.instance;
      const senderPID = getState().keyring?.currentWallet.principal;
      const { canisterId } = args;
      getApp(keyring.currentWalletId.toString(), metadata.url, app => {
        if (app.status !== CONNECTION_STATUS.accepted) {
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CONNECTION_ERROR,
            }),
          );
        }
        if (canisterId && !(canisterId in app.whitelist)) {
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              error: ERRORS.CANISTER_NOT_WHITLESTED_ERROR(canisterId),
            }),
          );
        }
        getProtectedIds(async protectedIds => {
          const canisterInfo = app.whitelist[canisterId];
          const shouldShowModal =
            (!batchTxId || batchTxId.lenght === 0) &&
            protectedIds.includes(canisterInfo.id);

          const requestInfo = generateRequestInfo({
            ...args,
            sender: senderPID,
          });

          if (shouldShowModal) {
            const handleApprove = () => {
              dispatch(
                walletConnectExecuteAndResponse({
                  ...request,
                  args: [{ requestInfo, approve: true }],
                }),
              );
            };

            const handleDecline = () => {
              dispatch(
                walletConnectExecuteAndResponse({
                  ...request,
                  args: [{ requestInfo, approve: false }],
                }),
              );
            };

            Navigation.handleAction(Routes.WALLET_CONNECT_SCREENS, {
              type: 'requestCall',
              openAutomatically: true,
              request,
              metadata,
              args: requestInfo,
              handleApprove,
              handleDecline,
            });
          } else {
            getBatchTransactions(batchTransactions => {
              const savedBatchTransaction = batchTxId
                ? batchTransactions[batchTxId].shift()
                : undefined;

              setBatchTransactions({ ...batchTransaction }, () => {
                dispatch(
                  walletConnectExecuteAndResponse({
                    ...request,
                    args: [
                      {
                        requestInfo,
                        approve: true,
                        savedBatchTransaction,
                        batchTxId,
                      },
                    ],
                  }),
                );
              });
            });
          }
        });
      });
    },
    executor: async (
      opts,
      { approve, requestInfo, savedBatchTransaction, batchTxId },
    ) => {
      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }

      const keyring = getState().keyring?.instance;
      const agent = keyring.getAgent();

      const arg = blobFromBuffer(base64ToBuffer(requestInfo.arguments));
      try {
        if (batchTxId && batchTxId.lenght !== 0 && savedBatchTransaction) {
          return { error: ERRORS.NOT_VALID_BATCH_TRANSACTION };
        }

        if (savedBatchTransaction) {
          const validBatchTx = validateBatchTx(
            savedBatchTransaction,
            requestInfo,
          );
          if (!validBatchTx) {
            return { error: ERRORS.NOT_VALID_BATCH_TRANSACTION };
          }
        }

        const response = await agent.call(
          Principal.fromText(requestInfo.canisterId),
          {
            methodName: requestInfo.methodName,
            arg,
          },
        );

        return {
          result: {
            ...response,
            requestId: bufferToBase64(blobToUint8Array(response.requestId)),
          },
        };
      } catch (e) {
        return { error: ERRORS.SERVER_ERROR(e) };
      }
    },
  };

  const requestReadState = {
    methodName: 'requestReadState',
    handler: async (request, metadata, { canisterId, paths }) => {
      const keyring = getState().keyring?.instance;
      try {
        getApp(keyring.currentWalletId, metadata.url, app => {
          if (app.status !== CONNECTION_STATUS.accepted) {
            return dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                error: ERRORS.CONNECTION_ERROR,
              }),
            );
          }
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              approve: true,
              args: [canisterId, paths],
            }),
          );
        });
      } catch (e) {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            error: ERRORS.SERVER_ERROR(e),
          }),
        );
      }
    },
    executor: async (opts, canisterId, paths) => {
      const keyring = getState().keyring?.instance;
      const agent = keyring.getAgent();
      try {
        const response = await agent.readState(canisterId, {
          paths: [paths.map(path => blobFromBuffer(base64ToBuffer(path)))],
        });

        return {
          result: {
            certificate: bufferToBase64(blobToUint8Array(response.certificate)),
          },
        };
      } catch (e) {
        return { error: ERRORS.SERVER_ERROR(e) };
      }
    },
  };

  const requestQuery = {
    methodName: 'requestQuery',
    handler: async (request, metadata, { canisterId, methodName, arg }) => {
      const keyring = getState().keyring?.instance;
      try {
        getApp(keyring.currentWalletId, metadata.url, app => {
          if (app.status !== CONNECTION_STATUS.accepted) {
            return dispatch(
              walletConnectExecuteAndResponse({
                ...request,
                error: ERRORS.CONNECTION_ERROR,
              }),
            );
          }
          return dispatch(
            walletConnectExecuteAndResponse({
              ...request,
              approve: true,
              args: [canisterId, methodName, arg],
            }),
          );
        });
      } catch (e) {
        dispatch(
          walletConnectExecuteAndResponse({
            ...request,
            error: ERRORS.SERVER_ERROR(e),
          }),
        );
      }
    },
    executor: async (opts, canisterId, methodName, arg) => {
      const keyring = getState().keyring?.instance;
      const agent = keyring.getAgent();
      try {
        const response = await agent.query(canisterId, {
          methodName,
          arg: blobFromBuffer(base64ToBuffer(arg)),
        });

        if (response.reply) {
          response.reply.arg = bufferToBase64(
            blobToUint8Array(response.reply.arg),
          );
        }
        return {
          result: response,
        };
      } catch (e) {
        return { error: ERRORS.SERVER_ERROR(e) };
      }
    },
  };

  return [
    requestTransfer,
    requestTransferToken,
    requestBurnXTC,
    batchTransaction,
    requestCall,
    requestReadState,
    requestQuery,
  ];
};

export default TransactionModule;
