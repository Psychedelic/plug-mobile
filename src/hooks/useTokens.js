import React, { useState } from 'react';
import Icon from '../components/icons';

const TOKENS = [
  {
    symbol: 'ICP',
    name: 'ICP',
    amount: 152.28,
    value: 12183.29,
    icon: <Icon name="dfinity" />,
  },
  {
    symbol: 'XTC',
    name: 'Cycles',
    amount: 102.2913,
    value: 102.3,
    icon: <Icon name="xtc" />,
  },
];

const useTokens = () => {
  const [tokens, setTokens] = useState(TOKENS);

  return { tokens }
}

export default useTokens;
