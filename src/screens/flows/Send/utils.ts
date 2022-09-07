import { DEFAULT_FEE, XTC_FEE } from '@/constants/addresses';
import { TOKENS, USD_PER_TC } from '@/constants/assets';

export const getAvailableAmount = (
  amount: number,
  symbol: string,
  tokenPrice: number
) => {
  const { currentFee } = getTransactionFee(symbol, tokenPrice);
  return Math.max((amount || 0) - currentFee, 0);
};

export const getUsdAvailableAmount = (
  availableAmount: number,
  selectedTokenPrice: number
) => (selectedTokenPrice ? availableAmount * selectedTokenPrice : null);

export const getTransactionFee = (tokenSymbol: string, tokenPrice: number) => {
  let currentFee;
  let currentUSDFee;

  switch (tokenSymbol) {
    case TOKENS.ICP.symbol:
      currentFee = DEFAULT_FEE;
      currentUSDFee = DEFAULT_FEE * tokenPrice;
      break;
    case TOKENS.XTC.symbol:
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
