import { omit, pickBy } from 'lodash';

import { walletConnectStorage } from '@/redux/store';

const SESSION_KEY = 'sessions';
const APP_KEY = 'apps';

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
