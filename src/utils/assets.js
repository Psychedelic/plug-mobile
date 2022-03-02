export const CYCLES_PER_TC = 1000000000000;
export const USD_PER_TC = 1.42656;
export const E8S_PER_ICP = 100000000;

export const TOKEN_IMAGES = {
  XTC: 'xtc',
  ICP: 'dfinity',
  WICP: 'wicp',
};

export const CURRENCIES = new Map([
  [
    'ICP',
    {
      id: 'ICP',
      name: 'ICP',
      value: 'ICP',
      symbol: 'ICP',
      image: TOKEN_IMAGES.ICP,
    },
  ],
  [
    'XTC',
    {
      id: 'XTC',
      name: 'Cycles',
      value: 'XTC',
      image: TOKEN_IMAGES.XTC,
      symbol: 'XTC',
      price: USD_PER_TC,
    },
  ],
]);

export const formatAssetBySymbol = (amount, symbol, icpPrice) => {
  return (
    {
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
    }[symbol || 'default'] || { amount, value: amount }
  );
};

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
