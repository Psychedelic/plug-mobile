import { ALPHANUM_AND_SPECIAL_CHARS_REGEX } from '@constants/addresses';

export const createPasswordRules = {
  required: 'Password is required.',
  pattern: {
    value: ALPHANUM_AND_SPECIAL_CHARS_REGEX,
    message: 'Password must be alphanumeric.',
  },
  maxLength: {
    value: 24,
    message: 'Password is too long.',
  },
  minLength: {
    value: 12,
    message: 'Password must be at least 12 characters long.',
  },
};

export const createPasswordFields = {
  password: 'password',
};
