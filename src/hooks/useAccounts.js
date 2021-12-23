import { useDispatch, useSelector } from 'react-redux';
import { createSubaccount, editSubaccount } from '../redux/slices/keyring';

const useAccounts = () => {
  const dispatch = useDispatch();
  const { wallets } = useSelector(state => state.keyring);

  const onCreate = account => {
    console.log('createaccount', account);
    dispatch(createSubaccount(account));
  };

  const onEdit = account => {
    console.log('editaccount', account);
    dispatch(editSubaccount(account));
  };

  return { accounts: wallets, onCreate, onEdit };
};

export default useAccounts;
