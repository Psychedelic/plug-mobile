import { SIGNER_SERVER_URL } from '@/constants/walletconnect';
import { TransactionData } from '@/interfaces/walletConnect';

export const addBatchTransaction = async (
  batchTxData: TransactionData[],
  metadata: any,
  host: string
) => {
  const response = await fetch(`${SIGNER_SERVER_URL}/batchTransaction`, {
    method: 'POST',
    body: JSON.stringify({ batchTxData, metadata, host }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  console.log('response', response);
  return response.json();
};

export const addDelegation = async (
  batchTxId: string,
  delegationChainJSON: string
) => {
  const response = await fetch(`${SIGNER_SERVER_URL}/delegation`, {
    method: 'POST',
    body: JSON.stringify({ batchTxId, delegationChainJSON }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return response.ok;
};
