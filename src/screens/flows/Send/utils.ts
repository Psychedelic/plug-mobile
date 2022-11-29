import { TOKENS, USD_PER_TC } from '@/constants/assets';

// TODO: Remove this after Sonic integration
export const getFeePrice = (
  tokenSymbol: string,
  icpPrice: number,
  tokenFee: number = 0
) => {
  switch (tokenSymbol) {
    case TOKENS.ICP.symbol:
      return tokenFee * icpPrice;
    case TOKENS.XTC.symbol:
      return tokenFee * USD_PER_TC;
    default:
      return null;
  }
};
