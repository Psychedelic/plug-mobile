import JsonBigInt from 'json-bigint';

export const recursiveParseBigInt = obj =>
  JsonBigInt.parse(JsonBigInt.stringify(obj));
