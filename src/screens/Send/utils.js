import { toFixedNoRounding } from '../../utils/number';
import { DEFAULT_FEE, XTC_FEE } from '../../constants/addresses';

export const USD_MAX_DECIMALS = 2;
export const ICP_MAX_DECIMALS = 8;

export const formatSendAmount = (amount, maxDecimals) => {
  const stringifyAmount = amount.toString();
  let formattedAmount = amount;
  if (
    stringifyAmount.includes('.') &&
    stringifyAmount.split('.')[1].length > maxDecimals
  ) {
    formattedAmount = toFixedNoRounding(amount, maxDecimals);
  }
  return formattedAmount;
};

export const getAvailableAmount = amount => {
  return Math.max((amount || 0) - getTransactionFee(), 0);
};

export const getUsdAvailableAmount = (availableAmount, selectedTokenPrice) =>
  availableAmount * (selectedTokenPrice || 1);

export const getTransactionFee = tokenSymbol => {
  let currentFee;

  switch (tokenSymbol) {
    case 'ICP':
      currentFee = DEFAULT_FEE;
      break;
    case 'XTC':
      currentFee = XTC_FEE;
      break;
    default:
      currentFee = 0.0;
      break;
  }
  return currentFee;
};
