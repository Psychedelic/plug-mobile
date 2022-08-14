import React from 'react';

import { WallectConnectFlowsData } from '@/interfaces/walletConnect';

import TransferItem from '../TransferItem';

interface Props extends WallectConnectFlowsData {
  canisterId: string;
}

function RequestTransfer({ canisterId }: Props) {
  return <TransferItem canisterId={canisterId} />;
}

export default RequestTransfer;
