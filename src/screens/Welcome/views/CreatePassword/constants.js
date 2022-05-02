import { ALPHANUM_AND_SPECIAL_CHARS_REGEX } from '@constants/addresses';

export const MIN_LENGTH_MESSAGE =
  'Password must be at least 12 characters long.';

export const createPasswordRules = {
  required: 'Password is required.',
  pattern: {
    value: ALPHANUM_AND_SPECIAL_CHARS_REGEX,
    message: 'Invalid character.',
  },
  maxLength: {
    value: 24,
    message: 'Password is too long.',
  },
  minLength: {
    value: 12,
    message: MIN_LENGTH_MESSAGE,
  },
};

export const createPasswordFields = {
  password: 'password',
};
