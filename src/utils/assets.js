import { ICP_CANISTER_ID } from '@/constants/canister';
import { validateCanisterId } from '@/utils/ids';
import { parseToFloatAmount } from '@/utils/number';

export const CYCLES_PER_TC = 1000000000000;
export const USD_PER_TC = 1.42656;
export const E8S_PER_ICP = 100000000;

export const TOKEN_IMAGES = {
  XTC: 'xtc',
  ICP: 'dfinity',
  WICP: 'wicp',
};

export const TOKENS = {
  ICP: {
    symbol: 'ICP',
    canisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    name: 'ICP',
    decimals: 8,
    amount: 0,
    value: 0,
    image: TOKEN_IMAGES.ICP,
  },
  XTC: {
    symbol: 'XTC',
    canisterId: 'aanaa-xaaaa-aaaah-aaeiq-cai',
    name: 'Cycles',
    decimals: 12,
    amount: 0,
    value: 0,
    image: TOKEN_IMAGES.XTC,
  },
  WICP: {
    symbol: 'WICP',
    canisterId: 'aanaa-xaaaa-aaaah-aaeiq-cai',
    name: 'Wrapped ICP',
    decimals: 8,
    amount: 0,
    value: 0,
    image: TOKEN_IMAGES.WICP,
  },
};

export const formatAssetBySymbol = (amount, symbol, icpPrice) =>
  ({
    ICP: {
      amount,
      value: amount * icpPrice,
      icon: TOKEN_IMAGES.ICP,
      symbol: 'ICP',
    },
    XTC: {
      amount,
      value: amount * USD_PER_TC,
      icon: TOKEN_IMAGES.XTC,
      symbol: 'XTC',
    },
    WTC: {
      amount,
      value: amount * USD_PER_TC,
      symbol: 'WTC',
    },
    WICP: {
      amount,
      value: amount * icpPrice,
      icon: TOKEN_IMAGES.WICP,
      symbol: 'WICP',
    },
    default: { amount, value: amount },
  }[symbol || 'default'] || { amount, value: amount });

export const formatAssets = ({ assets = [], icpPrice }) => {
  const mappedAssets = assets.map(({ amount, name, symbol, canisterId }) => {
    const asset = formatAssetBySymbol(amount, symbol, icpPrice);
    return {
      ...asset,
      name,
      symbol,
      canisterId,
    };
  });
  return mappedAssets;
};

export const parseAssetsAmount = (assets = []) =>
  assets.map(currentAsset => {
    const { amount, token } = currentAsset;
    const { decimals } = token;

    const parsedAmount = parseToFloatAmount(
      amount,
      parseInt(decimals.toString(), 10)
    );

    return {
      ...currentAsset,
      amount: parsedAmount,
    };
  });

// TokenIdentifier is SYMBOL or  CanisterID
// Return ICP by default
export const getToken = (tokenIdentifier, assets) => {
  if (!tokenIdentifier) {
    return assets.find(asset => asset.canisterId === ICP_CANISTER_ID);
  }

  if (validateCanisterId(tokenIdentifier)) {
    return assets.find(asset => asset.canisterId === tokenIdentifier);
  }

  return assets.find(asset => asset.symbol === tokenIdentifier);
};
