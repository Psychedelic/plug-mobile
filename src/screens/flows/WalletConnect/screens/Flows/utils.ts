import { TOKENS } from '@/constants/assets';

const CYCLE_DECIMALS = 12;
export const ICP_DECIMALS = 8;

export const TRANSFER_METHOD_NAMES = [
  'transfer',
  'transferErc20',
  'transfer_to',
  'send_dfx',
];

const getDip20Amount = (methodName: string) => {
  switch (methodName) {
    case 'transferFrom':
      return (args: any[]) => args?.[2] / 10 ** CYCLE_DECIMALS;
    default:
      return (args: any[]) => args?.[1] / 10 ** CYCLE_DECIMALS;
  }
};

export const getAssetData = (canisterId: string) =>
  Object.values(TOKENS).find(token => token.canisterId === canisterId);

export const ICP_DIVISOR = 10 ** ICP_DECIMALS;

const ICP_AMOUNT_MAP = (args: any) => args?.[0]?.amount?.e8s / ICP_DIVISOR;

// Get the amount of the token being transferred according to the standard
export const getAssetAmount = (
  request: { methodName: string; decodedArguments: any[] },
  standard: string
) => {
  const { methodName } = request || {};
  const dip20Amount = getDip20Amount(methodName);
  const amountInArgs = {
    DIP20: dip20Amount,
    XTC: dip20Amount,
    WICP: dip20Amount,
    ICP: ICP_AMOUNT_MAP,
    ROSETTA: ICP_AMOUNT_MAP,
  }[standard?.toUpperCase?.()];
  return amountInArgs?.(request?.decodedArguments) || 0;
};

export const getNFTId = ({
  methodName,
  decodedArguments,
}: {
  methodName: string;
  decodedArguments: any[];
}) => {
  const indexInArgs = {
    transfer: (args: any) => args?.[0]?.token || args?.[1],
    transfer_to: (args: any) => args?.[1],
  }[methodName]!;

  return indexInArgs(decodedArguments);
};
