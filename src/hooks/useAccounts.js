import { useDispatch, useSelector } from 'react-redux';

import {
  createSubaccount,
  editSubaccount,
  importAccountFromPem,
} from '@/redux/slices/keyring';

const useAccounts = () => {
  const dispatch = useDispatch();
  const { wallets } = useSelector(state => state.keyring);

  const onCreate = account => {
    dispatch(
      account?.pem ? importAccountFromPem(account) : createSubaccount(account)
    );
  };

  const onEdit = account => {
    dispatch(editSubaccount(account));
  };

  return { accounts: wallets, onCreate, onEdit };
};

export default useAccounts;
