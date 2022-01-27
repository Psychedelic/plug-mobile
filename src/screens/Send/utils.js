import { toFixedNoRounding } from '../../utils/number';

export const formatSendAmount = (amount, maxDecimals) => {
  const stringifyAmount = amount.toString();
  let formattedAmount = amount;
  if (
    stringifyAmount.includes('.') &&
    stringifyAmount.split('.')[1].length > maxDecimals
  ) {
    formattedAmount = toFixedNoRounding(amount, maxDecimals);
  }
  return formattedAmount;
};
