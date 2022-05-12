import i18next from 'i18next';

import { ALPHANUM_AND_SPECIAL_CHARS_REGEX } from '@/constants/addresses';

export const MIN_LENGTH_MESSAGE = i18next.t('validations.passMinLength');

export const createPasswordRules = {
  required: i18next.t('validations.passRequired'),
  pattern: {
    value: ALPHANUM_AND_SPECIAL_CHARS_REGEX,
    message: i18next.t('validations.invalidChar'),
  },
  minLength: {
    value: 12,
    message: i18next.t('validations.passMinLength'),
  },
};

export const createPasswordFields = {
  password: 'password',
};
