import mime from 'mime-types';

/**
 * Function that returns the mime-type of a given url
 * @param value URL of file
 * @returns mime-type of file
 */
export const getType = (value?: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  return mime.lookup(value);
};

export const getExtension = (value?: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  return mime.extension(value);
};
