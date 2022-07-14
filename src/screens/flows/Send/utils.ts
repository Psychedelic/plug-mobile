import { DEFAULT_FEE, XTC_FEE } from '@/constants/addresses';
import { USD_PER_TC } from '@/constants/assets';

export const getAvailableAmount = (
  amount: number,
  symbol: string,
  icpPrice: number
) => {
  const { currentFee } = getTransactionFee(symbol, icpPrice);
  return Math.max((amount || 0) - currentFee, 0);
};

export const getUsdAvailableAmount = (
  availableAmount: number,
  selectedTokenPrice: number
) => availableAmount * (selectedTokenPrice || 1);

export const getTransactionFee = (tokenSymbol: string, icpPrice: number) => {
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
