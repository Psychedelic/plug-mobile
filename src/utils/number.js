/* eslint-disable radix */
export function toFixedNoRounding(amount, n) {
  amount = toFixed(amount);
  const v = (typeof amount === 'string' ? amount : amount.toString()).split(
    '.',
  );

  if (n <= 0) {
    return v[0];
  }

  let f = v[1] || '';
  if (f.length > n) {
    return `${v[0]}.${f.substr(0, n)}`;
  }

  while (f.length < n) {
    f += '0';
  }

  return `${v[0]}.${f}`;
}

function toFixed(amount) {
  if (Math.abs(amount) < 1.0) {
    var e = parseInt(amount.toString().split('e-')[1]);
    if (e) {
      amount *= Math.pow(10, e - 1);
      amount = '0.' + new Array(e).join('0') + amount.toString().substring(2);
    }
  } else {
    var e = parseInt(amount.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      amount /= Math.pow(10, e);
      amount += new Array(e + 1).join('0');
    }
  }

  return amount;
}

export const formatToMaxDecimals = (number, maxDecimals) => {
  const stringifyAmount = `${number}`.split('.')[1];
  if (stringifyAmount && stringifyAmount.length > maxDecimals) {
    return number?.toFixed(maxDecimals);
  }
  return number;
};

// TODO: check if this goes here
export const parseToFloatAmount = (amount, decimals) => {
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
      formatedString.length,
    )}`;
  }

  return `${
    prefix + amountString.slice(0, Math.abs(difference))
  }.${amountString.slice(Math.abs(difference))}`;
};
