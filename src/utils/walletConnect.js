import { blobFromUint8Array } from '@dfinity/candid';
import { Buffer } from 'buffer';
import { omit, pickBy } from 'lodash';

import { ERRORS } from '@/constants/walletconnect';
import { getAssets, sign } from '@/redux/slices/user';
import { walletConnectStorage } from '@/redux/store';

const SESSION_KEY = 'sessions';
const SIGNING_METHODS = ['sign', 'transfer'];

/**
 * @desc get all wallet connect sessions
 * @return {Object}
 */
export const getAllValidWalletConnectSessions = async () => {
  const allSessions = await getAllWalletConnectSessions();
  return pickBy(allSessions, value => value.connected);
};

/**
 * @desc get all wallet connect sessions
 * @return {Object}
 */
const getAllWalletConnectSessions = () => walletConnectStorage.get(SESSION_KEY);

/**
 * @desc save wallet connect session
 * @param  {String}   [peerId]
 * @param  {Object}   [session]
 */
export const saveWalletConnectSession = async (peerId, session) => {
  const allSessions = await getAllValidWalletConnectSessions();
  allSessions[peerId] = session;
  await walletConnectStorage.set(SESSION_KEY, allSessions);
};

/**
 * @desc remove wallet connect sessions
 * @param  {String}   [sessionId]
 */
export const removeWalletConnectSessions = async sessionIds => {
  const allSessions = await getAllWalletConnectSessions();
  const resultingSessions = omit(allSessions, sessionIds);
  await walletConnectStorage.set(SESSION_KEY, resultingSessions);
};

function bufferToBase64(buf) {
  return Buffer.from(buf.buffer).toString('base64');
}

function base64ToBuffer(base64) {
  return Buffer.from(base64, 'base64');
}

const WALLETCONNECT_HANDLERS = {
  sign: async (args, dispatch) => {
    if (!(args && args.lenght > 0)) {
      throw ERRORS.NO_MSG_SIGN;
    }

    const argsDecoded = base64ToBuffer(args[0]);

    const result = await dispatch(
      sign({ msg: blobFromUint8Array(new Uint8Array(argsDecoded)) }),
    ).unwrap();

    return { result: result.response.toString('base64') };
  },
  sign_read_state: async (args, dispatch) => {
    if (!(args && args.lenght > 0)) {
      throw ERRORS.NO_MSG_SIGN;
    }

    const argsDecoded = base64ToBuffer(args[0]);

    const result = await dispatch(
      sign({ msg: blobFromUint8Array(new Uint8Array(argsDecoded)) }),
    ).unwrap();
    return { result: result.response.toString('base64') };
  },
  getAssets: async (args, dispatch) => {
    const result = await dispatch(getAssets(args));
    return result;
  },
};

export const notSigningMethod = method => !SIGNING_METHODS.includes(method);

export const walletConnectHandleMethod = (method, args, dispatch) => {
  return WALLETCONNECT_HANDLERS[method](args, dispatch);
};
