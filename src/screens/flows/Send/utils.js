import { DEFAULT_FEE, XTC_FEE } from '../../constants/addresses';
import { toFixedNoRounding } from '../../utils/number';
import { USD_PER_TC } from '../../utils/assets';

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

export const getAvailableAmount = (amount, symbol, icpPrice) => {
  const { currentFee } = getTransactionFee(symbol, icpPrice);
  return Math.max((amount || 0) - currentFee, 0);
};

export const getUsdAvailableAmount = (availableAmount, selectedTokenPrice) =>
  availableAmount * (selectedTokenPrice || 1);

export const getTransactionFee = (tokenSymbol, icpPrice) => {
  let currentFee;
  let currentUSDFee;

  switch (tokenSymbol) {
    case 'ICP':
      currentFee = DEFAULT_FEE;
      currentUSDFee = DEFAULT_FEE * icpPrice;
      break;
    case 'XTC':
      currentFee = XTC_FEE;
      currentUSDFee = XTC_FEE * USD_PER_TC;
      break;
    default:
      currentFee = 0.0;
      currentUSDFee = 0.0;
      break;
  }
  return { currentFee, currentUSDFee };
};
