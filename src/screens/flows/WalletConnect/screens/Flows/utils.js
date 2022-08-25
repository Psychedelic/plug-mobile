import { TOKENS } from '@/constants/assets';

const CYCLE_DECIMALS = 12;
export const ICP_DECIMALS = 8;

export const TRANSFER_METHOD_NAMES = [
  'transfer',
  'transferErc20',
  'transfer_to',
  'send_dfx',
];

const DIP20_AMOUNT_MAP = {
  transfer: args => args?.[1] / 10 ** CYCLE_DECIMALS,
  transferErc20: args => args?.[1] / 10 ** CYCLE_DECIMALS,
  transferFrom: args => args?.[2] / 10 ** CYCLE_DECIMALS,
};

export const getAssetData = canisterId =>
  Object.values(TOKENS).find(token => token.canisterId === canisterId);

export const ICP_DIVISOR = 10 ** ICP_DECIMALS;

const ICP_AMOUNT_MAP = args => args?.[0]?.amount?.e8s / ICP_DIVISOR;

// Get the amount of the token being transferred according to the standard
export const getAssetAmount = (request, standard) => {
  const { methodName } = request || {};
  const amountInArgs = {
    DIP20: DIP20_AMOUNT_MAP[methodName],
    XTC: DIP20_AMOUNT_MAP[methodName],
    WICP: DIP20_AMOUNT_MAP[methodName],
    ICP: ICP_AMOUNT_MAP,
    ROSETTA: ICP_AMOUNT_MAP,
  }[standard?.toUpperCase?.()];
  return amountInArgs(request?.decodedArguments);
};

export const getNFTId = ({ methodName, decodedArguments }) => {
  const indexInArgs = {
    transfer: args => args?.[0]?.token || args?.[1],
    transfer_to: args => args?.[1],
  }[methodName];

  return indexInArgs(decodedArguments);
};
