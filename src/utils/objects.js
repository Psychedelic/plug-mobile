import { Principal } from '@dfinity/principal';

export const recursiveParseBigint = obj => {
  if (Array.isArray(obj)) {
    return obj.map(recursiveParseBigint);
  }
  if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = recursiveParseBigint(obj[key]);
      return acc;
    }, {});
  }
  if (typeof obj === 'bigint') {
    return parseInt(obj.toString(), 10);
  }
  return obj;
};

export const recursiveParsePrincipal = data =>
  Object.entries(data).reduce((acum, [key, val]) => {
    const current = { ...acum };
    if (Array.isArray(val)) {
      current[key] = val.map(v => recursiveParsePrincipal(v));
    } else if (val._isPrincipal) {
      current[key] = Principal.fromUint8Array(
        new Uint8Array(Object.values(val._arr))
      ).toString();
    } else if (typeof val === 'object') {
      current[key] = recursiveParsePrincipal(val);
    } else {
      current[key] = val;
    }
    return current;
  }, {});

export const areAllElementsIn = (elements, array) =>
  elements.every(element => array.includes(element));
