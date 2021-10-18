import React, { useState } from 'react';
import Icon from '../components/icons';

const TOKENS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 100,
    value: 43,
    icon: "dfinity",
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 100,
    value: 100,
    icon: "xtc",
  },
];

const useTokens = () => {
  const [tokens, setTokens] = useState(TOKENS);

  return { tokens }
}

export default useTokens;
