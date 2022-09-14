import { TokenBalance } from 'src/interfaces/keyring';
import { Asset } from 'src/interfaces/redux';

import { TOKEN_IMAGES, USD_PER_TC } from '@/constants/assets';

import { recursiveParseBigint } from './objects';

export const formatAssetBySymbol = (
  _amount: string,
  symbol: string,
  icpPrice: number
) => {
  const amount = Number.isNaN(_amount) ? NaN : parseFloat(_amount);
  const icpValue = Number.isNaN(amount) ? NaN : amount * icpPrice;
  const tcValue = Number.isNaN(amount) ? NaN : amount * USD_PER_TC;

  return (
    {
      ICP: {
        amount,
        value: icpValue,
        icon: TOKEN_IMAGES.ICP,
      },
      XTC: {
        amount,
        value: tcValue,
        icon: TOKEN_IMAGES.XTC,
      },
      WTC: {
        amount,
        value: tcValue,
        icon: undefined, //TODO: should we add a default icon?
      },
      WICP: {
        amount,
        value: icpValue,
        icon: TOKEN_IMAGES.WICP,
      },
    }[symbol] || { amount, value: undefined, icon: undefined } // What should we do if we don't know the value?
  );
};

export const parseToFloatAmount = (amount: string, decimals: number) => {
  let amountString = `${amount}`;
  let prefix = '';

  if (amountString[0] === '-') {
    prefix = '-';
    amountString = amountString.slice(1, amountString.length);
  }

  const difference = decimals - amountString.length;

  if (decimals >= amountString.length) {
    const formatedString = '0'.repeat(difference + 1) + amountString;

    return `${prefix + formatedString[0]}.${formatedString.slice(
      1,
      formatedString.length
    )}`;
  }

  return `${
    prefix + amountString.slice(0, Math.abs(difference))
  }.${amountString.slice(Math.abs(difference))}`;
};

/* Parse a string representing a floating point number to a string representing a BigNumber. */
export const parseToBigIntString = (
  amount: number,
  decimalPlaces: number
): string => {
  if (amount < 10 ** -decimalPlaces) {
    return '0';
  }
  const amountString = `${amount}`.slice(0, decimalPlaces + 2);
  let decimalsToFill = 0;
  if (amountString.includes('e-')) {
    const [base, exponent] = amountString.split('e-');
    return parseToBigIntString(Number(base), decimalPlaces - Number(exponent));
  }
  const [main, decimals] = amountString.split('.');
  decimalsToFill = Math.max(decimalPlaces - Number(decimals?.length || 0), 0);
  const completeDecimals = (decimals || '') + '0'.repeat(decimalsToFill);
  return `${main}${completeDecimals}`;
};

export const formatAssets = (
  assets: TokenBalance[] = [],
  icpPrice: number
): Asset[] =>
  assets.map(currentAsset => {
    const { amount, token } = currentAsset;
    const { symbol, decimals, fee } = token;

    const parsedAmount = parseToFloatAmount(
      amount,
      parseInt(decimals.toString(), 10)
    );

    const parsedFee = fee / 10 ** parseInt(decimals.toString(), 10);

    const formattedAsset = {
      ...token,
      // Sometimes names come with a strange char that causes problems
      name: token?.name?.replaceAll('\x00', ''),
      fee: parsedFee,
      ...formatAssetBySymbol(parsedAmount, symbol, icpPrice),
    };

    return recursiveParseBigint(formattedAsset);
  });
