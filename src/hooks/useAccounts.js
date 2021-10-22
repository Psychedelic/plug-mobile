import { useState } from 'react';

const ACCOUNTS = [
  {
    principalId: '123123123123123',
    name: 'Chris',
    icon: '🔥',
    accountId: '123123',
    walletNumber: 0,
  },
  {
    principalId: '34534534534535',
    name: 'letsgoo 420',
    icon: '🔥',
    accountId: '123123',
    walletNumber: 1,
  },
];

const useAccounts = () => {
  const [accounts, setAccounts] = useState(ACCOUNTS);

  const onCreate = account => setAccounts([...accounts, account]);
  const onDelete = account =>
    setAccounts(accounts.filter(c => c.principalId !== account.principalId));

  return { accounts, onCreate, onDelete };
};

export default useAccounts;
