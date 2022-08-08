import React from 'react';
import { useSelector } from 'react-redux';

import { getTokenPrices } from '@/constants/assets';
import { State } from '@/interfaces/redux';
import { WallectConnectFlowsData, WCToken } from '@/interfaces/walletConnect';
import { getUsdAvailableAmount } from '@/screens/flows/Send/utils';

import TransferItem from '../TransferItem';

interface Props extends WallectConnectFlowsData {
  token: WCToken;
}

function RequestTransfer({ token }: Props) {
  const { amount, symbol, icon } = token;
  const { icpPrice } = useSelector((state: State) => state.icp);
  const tokenPrice = getTokenPrices(symbol, icpPrice);
  const usdValue = getUsdAvailableAmount(amount, tokenPrice);

  return <TransferItem item={{ usdValue, icon, amount, symbol }} />;
}

export default RequestTransfer;
