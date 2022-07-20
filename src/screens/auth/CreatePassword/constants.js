import { t } from 'i18next';

import { ALPHANUM_AND_SPECIAL_CHARS_REGEX } from '@/constants/addresses';
import { MIN_PASSWORD_LENGTH } from '@/constants/general';

export const MIN_LENGTH_MESSAGE = t('validations.passMinLength');

export const createPasswordRules = {
  required: t('validations.passRequired'),
  pattern: {
    value: ALPHANUM_AND_SPECIAL_CHARS_REGEX,
    message: t('validations.invalidChar'),
  },
  minLength: {
    value: MIN_PASSWORD_LENGTH,
    message: t('validations.passMinLength'),
  },
};

export const createPasswordFields = {
  password: 'password',
};
