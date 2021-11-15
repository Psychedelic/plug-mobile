import { useEffect, useState } from 'react';
import useKeyring from './useKeyring';
import { useDispatch, useSelector } from 'react-redux';
import { createSubaccount } from '../redux/slices/keyring';

const useAccounts = () => {
  const dispatch = useDispatch();
  const { wallets } = useSelector(state => state.keyring);

  const onCreate = async (account) => {
    dispatch(createSubaccount(account));
  }

  const onEdit = async (account) => {
    dispatch(editSubaccount(account));
  }

  const onDelete = account => { }
  //setAccounts(accounts.filter(c => c.principalId !== account.principalId));


  return { accounts: wallets, onCreate, onEdit, onDelete };
};

export default useAccounts;
