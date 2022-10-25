export const deleteWhiteSpaces = str => str.replace(/\s/g, '');

export const getFirstLetterFrom = value => value.slice(0, 1);

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const addSpacesAndCapitalize = str =>
  capitalize(str.replaceAll('_', ' '));

export const toCamel = s => {
  return s.replace(/([-_][a-z])/gi, string => {
    return string.toUpperCase().replace('-', '').replace('_', '');
  });
};
