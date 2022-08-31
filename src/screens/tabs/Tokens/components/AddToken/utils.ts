import { BalanceResponse, DABToken } from '@/interfaces/dab';
import { formatAssetBySymbol, parseToFloatAmount } from '@/utils/currencies';

export const parseToken = (
  token: DABToken,
  amount: BalanceResponse,
  icpPrice: number
) => {
  const parsedAmount = parseToFloatAmount(amount.value, amount.decimals);
  return formatAssetBySymbol(parsedAmount, token.symbol, icpPrice);
};
