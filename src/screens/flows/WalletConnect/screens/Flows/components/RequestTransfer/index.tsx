import React from 'react';

import { WallectConnectFlowsData } from '@/interfaces/walletConnect';
import { useAppSelector } from '@/redux/hooks';
import { formatAssetBySymbol } from '@/utils/currencies';

import { getAssetData, ICP_DIVISOR } from '../../utils';
import TransferItem from '../TransferItem';

interface Props extends WallectConnectFlowsData {
  canisterId: string;
}

function RequestTransfer({ canisterId, args }: Props) {
  const assetData = getAssetData(canisterId);
  const { icpPrice } = useAppSelector(state => state.icp);

  const amount = args.amount
    ? args.amount / ICP_DIVISOR
    : args.strAmount
    ? parseFloat(args.strAmount)
    : 0;

  const token = {
    icon: assetData?.icon!,
    amount: amount,
    symbol: assetData?.symbol!,
    usdValue:
      formatAssetBySymbol(amount.toString(), assetData?.symbol!, icpPrice)
        .value || null,
  };

  return <TransferItem token={token} />;
}

export default RequestTransfer;
