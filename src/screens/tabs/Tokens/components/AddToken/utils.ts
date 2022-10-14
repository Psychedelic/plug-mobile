import { BalanceResponse } from '@/interfaces/dab';
import { formatAssetBySymbol, parseToFloatAmount } from '@/utils/currencies';

export const parseToken = (
  tokenSymbol: string,
  amount: BalanceResponse,
  icpPrice: number
) => {
  const parsedAmount = parseToFloatAmount(amount.value, amount.decimals);
  return formatAssetBySymbol(parsedAmount, tokenSymbol, icpPrice);
};
