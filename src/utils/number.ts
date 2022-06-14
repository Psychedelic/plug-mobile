import { getNumberFormatSettings } from 'react-native-localize';

import { VISIBLE_DECIMALS } from '@/constants/business';

export const { decimalSeparator, groupingSeparator: thousandSeparator } =
  getNumberFormatSettings();

export const isValidDecimal = (
  value: string,
  maxDecimals = VISIBLE_DECIMALS
) => {
  return RegExp(
    `^[0-9]+[${decimalSeparator}]?[0-9]{0,${maxDecimals}}$`,
    'g'
  ).test(value);
};

export const formatToMaxDecimals = (number: number, maxDecimals: number) => {
  const stringifyAmount = `${number}`.split('.')[1];
  if (stringifyAmount && stringifyAmount.length > maxDecimals) {
    return number?.toFixed(maxDecimals);
  }
  return number;
};

// TODO: check if this goes here
export const parseToFloatAmount = (amount: number, decimals: number) => {
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

export function parseLocaleNumber(stringNumber: string) {
  return Number(
    stringNumber
      .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
      .replace(new RegExp(`\\${decimalSeparator}`), '.')
  );
}

export function toFixedLocale(value: number, numDigits: number): string {
  const standardFixedString = value.toFixed(numDigits);

  if (decimalSeparator === ',') {
    return standardFixedString.replace('.', ',');
  } else {
    return standardFixedString; // Locale matches JavaScript default
  }
}
