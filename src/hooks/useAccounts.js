import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createSubaccount, editSubaccount } from '@/redux/slices/keyring';

const useAccounts = () => {
  const dispatch = useAppDispatch();
  const { wallets } = useAppSelector(state => state.keyring);

  const onCreate = account => {
    dispatch(createSubaccount(account));
  };

  const onEdit = account => {
    dispatch(editSubaccount(account));
  };

  return { accounts: wallets, onCreate, onEdit };
};

export default useAccounts;
