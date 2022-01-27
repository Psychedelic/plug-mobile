export const toFixedNoRounding = (amount, n) => {
  const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + n + '})?', 'g');
  const newAmount = amount.toString().match(reg)[0];
  const dot = newAmount.indexOf('.');
  if (dot === -1) {
    // integer, insert decimal dot and pad up zeros
    return newAmount + '.' + '0'.repeat(n);
  }
  const b = n - (newAmount.length - dot) + 1;
  return b > 0 ? newAmount + '0'.repeat(b) : newAmount;
};
