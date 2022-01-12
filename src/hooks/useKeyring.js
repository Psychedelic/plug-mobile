import { useDispatch, useSelector } from 'react-redux';

import { isIos } from '../constants/platform';
import {
  setCurrentWallet,
  setUnlocked,
  setWallets,
} from '../redux/slices/keyring';
import Keychain from '../modules/keychain';

const useKeyring = () => {
  const { instance } = useSelector(state => state.keyring);
  const dispatch = useDispatch();

  const saveBiometrics = async (password) => {
    await Keychain.resetPassword();
    await Keychain.setPassword(password);
  };

  const getState = async () => {
    const response = await instance?.getState();
    if (!response.wallets.length) {
      await instance?.lock();
    } else {
      const { wallets, currentWalletId } = response || {};
      dispatch(setWallets(wallets));
      dispatch(setCurrentWallet(wallets[currentWalletId]));
      return response;
    }
  };

  const unlock = async password => {
    let unlocked = false;
    try {
      unlocked = await instance.unlock(password);
      dispatch(setUnlocked(unlocked));
      await getState();
    } catch (e) {
      unlocked = false;
    }
    setUnlocked(unlocked);
    return unlocked;
  };

  return {
    keyring: instance,
    saveBiometrics,
    getState,
    unlock,
  };
};

export default useKeyring;
