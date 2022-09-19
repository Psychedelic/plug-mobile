export const deleteWhiteSpaces = str => str.replace(/\s/g, '');

export const getFirstLetterFrom = value => value.slice(0, 1);

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
