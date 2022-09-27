import { blobFromBuffer, blobToUint8Array } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { randomBytes } from 'crypto';

import { XTC_FEE } from '@/constants/addresses';
import { CYCLES_PER_TC, E8S_PER_ICP } from '@/constants/assets';
import { ICP_CANISTER_ID } from '@/constants/canister';
import { isIos } from '@/constants/platform';
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
import { addBatchTransaction, addDelegation } from '@/services/SignerServer';
import { getToken } from '@/utils/assets';
import { navigate } from '@/utils/navigation';
import { base64ToBuffer, bufferToBase64 } from '@/utils/utilities';
import {
  generateRequestInfo,
  validateBatchTx,
  validateBurnArgs,
  validateTransactions,
  validateTransferArgs,
} from '@/utils/walletConnect';

import KeyRing from '../keyring';

const TransactionModule = (dispatch, getState) => {
  const requestTransfer = {
    methodName: 'requestTransfer',
    handler: async (requestId, metadata, args) => {
      const keyring = KeyRing.getInstance();

      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        const argsError = validateTransferArgs(args);
        if (argsError) {
          return dispatch(
            walletConnectExecuteAndResponse({ requestId, error: argsError })
          );
        }

        const handleApproveArgs = [{ ...args, approve: true }];
        const handleDeclineArgs = [{ ...args, approve: false }];

        navigate(Routes.WALLET_CONNECT_FLOWS, {
          type: 'transfer',
          requestId,
          metadata,
          args,
          canisterId: ICP_CANISTER_ID,
          handleApproveArgs,
          handleDeclineArgs,
        });
      } else {
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: async (opts, { approve, amount, ...args }) => {
      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }
      const assets = await dispatch(getBalance()).unwrap();
      const icp = assets.find(asset => asset.canisterId === ICP_CANISTER_ID);
      const parsedAmount = amount / E8S_PER_ICP;
      if (icp?.amount > parsedAmount) {
        const response = await dispatch(
          sendToken({
            ...args,
            amount: parsedAmount,
            canisterId: ICP_CANISTER_ID,
          })
        ).unwrap();

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
    handler: async (requestId, metadata, args) => {
      const keyring = KeyRing.getInstance();

      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        const argsError = validateTransferArgs(args);
        if (argsError) {
          return dispatch(
            walletConnectExecuteAndResponse({ requestId, error: argsError })
          );
        }

        const handleApproveArgs = [{ ...args, approve: true }];
        const handleDeclineArgs = [{ ...args, approve: false }];

        navigate(Routes.WALLET_CONNECT_FLOWS, {
          type: 'transfer',
          requestId,
          metadata,
          args,
          handleApproveArgs,
          handleDeclineArgs,
        });
      } else {
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
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
          })
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
    handler: async (requestId, metadata, args) => {
      const keyring = KeyRing.getInstance();
      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        const argsError = validateBurnArgs(args);
        if (argsError) {
          return dispatch(
            walletConnectExecuteAndResponse({ requestId, error: argsError })
          );
        }

        const handleApproveArgs = [{ ...args, approve: true }];
        const handleDeclineArgs = [{ ...args, approve: false }];

        navigate(Routes.WALLET_CONNECT_FLOWS, {
          type: 'burnXTC',
          requestId,
          metadata,
          args,
          handleApproveArgs,
          handleDeclineArgs,
        });
      } else {
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
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
          })
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

  const batchTransactions = {
    methodName: 'batchTransactions',
    handler: async (requestId, metadata, transactions) => {
      const keyring = KeyRing.getInstance();

      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status === CONNECTION_STATUS.accepted) {
        const argsError = validateTransactions(transactions);
        if (argsError) {
          return dispatch(
            walletConnectExecuteAndResponse({ requestId, error: argsError })
          );
        }

        const handleApproveArgs = [{ metadata, transactions, approve: true }];
        const handleDeclineArgs = [{ transactions, approve: false }];

        navigate(Routes.WALLET_CONNECT_FLOWS, {
          type: 'batchTransactions',
          requestId,
          metadata,
          args: transactions,
          handleApproveArgs,
          handleDeclineArgs,
        });
      } else {
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
    },
    executor: async (opts, { approve, transactions, metadata }) => {
      const keyring = getState().keyring?.instance;

      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }

      if (isIos || true) {
        const agent = await keyring.getAgent();
        const host = agent._host;
        const { batchTxId, derPublicKey } = await addBatchTransaction(
          transactions.map(tx => ({
            canisterId: tx.canisterId,
            methodName: tx.methodName,
            args: tx.arguments,
          })),
          metadata,
          host
        );

        console.log('batchTxId', batchTxId);
        console.log('publicKey', derPublicKey);

        const bufferPublicKey = base64ToBuffer(derPublicKey);

        const delegationChain = await keyring.delegateIdentity({
          to: bufferPublicKey,
        });

        console.log('chainDelegation', delegationChain);

        const response = await addDelegation(batchTxId, delegationChain);

        console.log('response', response);

        return { result: { status: true, txId: batchTxId } };
      }

      const savedBatchTransactions = await getBatchTransactions();
      const newBatchTransactionId = randomBytes(16).toString('hex');
      const updatedBatchTransactions = {
        ...savedBatchTransactions,
        [newBatchTransactionId]: transactions.map(tx => ({
          canisterId: tx.canisterId,
          methodName: tx.methodName,
          args: tx.arguments,
        })),
      };
      await setBatchTransactions(updatedBatchTransactions);

      return { result: { status: true, txId: newBatchTransactionId } };
    },
  };

  const requestCall = {
    methodName: 'requestCall',
    handler: async (requestId, metadata, args, batchTxId, decodedArgs) => {
      const keyring = KeyRing.getInstance();
      const senderPID = getState().keyring?.currentWallet.principal;
      const { canisterId } = args;
      const app = await getApp(
        keyring.currentWalletId.toString(),
        metadata.url
      );
      if (app.status !== CONNECTION_STATUS.accepted) {
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CONNECTION_ERROR,
          })
        );
      }
      if (canisterId && !(canisterId in app.whitelist)) {
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.CANISTER_NOT_WHITLESTED_ERROR(canisterId),
          })
        );
      }
      const protectedIds = await getProtectedIds();
      const canisterInfo = app.whitelist[canisterId];
      const shouldShowModal =
        (!batchTxId || batchTxId.lenght === 0) &&
        protectedIds.includes(canisterInfo.canisterId);

      const requestInfo = generateRequestInfo(
        {
          ...args,
          sender: senderPID,
        },
        decodedArgs
      );

      if (shouldShowModal) {
        const handleApproveArgs = [{ requestInfo, approve: true }];
        const handleDeclineArgs = [{ requestInfo, approve: false }];

        navigate(Routes.WALLET_CONNECT_FLOWS, {
          type: 'requestCall',
          requestId,
          canisterInfo,
          metadata,
          args: requestInfo,
          canisterId,
          handleApproveArgs,
          handleDeclineArgs,
        });
      } else {
        const savedBatchTransactions = await getBatchTransactions();
        const savedBatchTransaction = batchTxId
          ? savedBatchTransactions[batchTxId].shift()
          : undefined;
        await setBatchTransactions({ ...savedBatchTransactions });
        await dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            args: [
              {
                requestInfo,
                approve: true,
                savedBatchTransaction,
                batchTxId,
              },
            ],
          })
        );
      }
    },
    executor: async (
      opts,
      { approve, requestInfo, savedBatchTransaction, batchTxId }
    ) => {
      if (!approve) {
        return { error: ERRORS.TRANSACTION_REJECTED };
      }

      const keyring = KeyRing.getInstance();
      const agent = await keyring.getAgent();

      const arg = blobFromBuffer(base64ToBuffer(requestInfo.arguments));
      try {
        if (batchTxId && batchTxId.length !== 0 && !savedBatchTransaction) {
          return { error: ERRORS.NOT_VALID_BATCH_TRANSACTION };
        }

        if (savedBatchTransaction) {
          const validBatchTx = validateBatchTx(
            savedBatchTransaction,
            requestInfo
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
          }
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
    handler: async (requestId, metadata, { canisterId, paths }) => {
      const keyring = KeyRing.getInstance();
      try {
        const app = await getApp(
          keyring.currentWalletId.toString(),
          metadata.url
        );
        if (app.status !== CONNECTION_STATUS.accepted) {
          return dispatch(
            walletConnectExecuteAndResponse({
              requestId,
              error: ERRORS.CONNECTION_ERROR,
            })
          );
        }
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            approve: true,
            args: [canisterId, paths],
          })
        );
      } catch (e) {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.SERVER_ERROR(e),
          })
        );
      }
    },
    executor: async (opts, canisterId, paths) => {
      const keyring = KeyRing.getInstance();
      const agent = await keyring.getAgent();
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
    handler: async (requestId, metadata, { canisterId, methodName, arg }) => {
      try {
        const keyring = KeyRing.getInstance();
        const app = await getApp(
          keyring.currentWalletId.toString(),
          metadata.url
        );

        if (app.status !== CONNECTION_STATUS.accepted) {
          return dispatch(
            walletConnectExecuteAndResponse({
              requestId,
              error: ERRORS.CONNECTION_ERROR,
            })
          );
        }
        return dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            approve: true,
            args: [canisterId, methodName, arg],
          })
        );
      } catch (e) {
        dispatch(
          walletConnectExecuteAndResponse({
            requestId,
            error: ERRORS.SERVER_ERROR(e),
          })
        );
      }
    },
    executor: async (opts, canisterId, methodName, arg) => {
      const keyring = KeyRing.getInstance();
      const agent = await keyring.getAgent();
      try {
        const response = await agent.query(canisterId, {
          methodName,
          arg: blobFromBuffer(base64ToBuffer(arg)),
        });

        if (response.reply) {
          response.reply.arg = bufferToBase64(
            blobToUint8Array(response.reply.arg)
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
    batchTransactions,
    requestCall,
    requestReadState,
    requestQuery,
  ];
};

export default TransactionModule;
