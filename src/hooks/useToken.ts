import { useSelector } from 'react-redux';

import { getTokenPrices } from '@/constants/assets';
import { State } from '@/interfaces/redux';
import { getUsdAvailableAmount } from '@/screens/flows/Send/utils';

export const useToken = (tokenId: string) => {
  const { assets } = useSelector((state: State) => state.user);
  const { icpPrice } = useSelector((state: State) => state.icp);
  const token = assets.find(({ canisterId }) => canisterId === tokenId);

  const tokenPrice = token ? getTokenPrices(token.symbol, icpPrice) : 0;
  const usdValue = token ? getUsdAvailableAmount(token.amount, tokenPrice) : 0;

  return {
    token,
    tokenPrice,
    usdValue,
  };
};
