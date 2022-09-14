import { USD_PER_TC } from '@/constants/assets';

// TODO: Remove this after Sonic integration
export const getFeePrice = (
  tokenSymbol: string,
  icpPrice: number,
  tokenFee: number
) => {
  switch (tokenSymbol) {
    case 'ICP':
      return tokenFee * icpPrice;
    case 'XTC':
      return tokenFee * USD_PER_TC;
    default:
      return null;
  }
};
