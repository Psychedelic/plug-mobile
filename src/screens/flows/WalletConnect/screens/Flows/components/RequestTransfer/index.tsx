import React from 'react';
import { useSelector } from 'react-redux';

import { getTokenPrices } from '@/constants/assets';
import { State } from '@/interfaces/redux';
import { WallectConnectFlowsData } from '@/interfaces/walletConnect';
import { getUsdAvailableAmount } from '@/screens/flows/Send/utils';

import { getAssetData, ICP_DIVISOR } from '../../utils';
import TransferItem from '../TransferItem';

interface Props extends WallectConnectFlowsData {
  canisterId: string;
}

function RequestTransfer({ canisterId, args }: Props) {
  const assetData = getAssetData(canisterId);
  const { icpPrice } = useSelector((state: State) => state.icp);

  const amount = args.amount
    ? args.amount / ICP_DIVISOR
    : args.strAmount
    ? parseFloat(args.strAmount)
    : 0;

  const token = {
    icon: assetData?.icon!,
    amount: amount,
    symbol: assetData?.symbol!,
    usdValue: getUsdAvailableAmount(
      amount,
      getTokenPrices(assetData?.symbol!, icpPrice)
    ),
  };

  return <TransferItem token={token} />;
}

export default RequestTransfer;
