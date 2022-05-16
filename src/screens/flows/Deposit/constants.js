import { t } from 'i18next';

import { Colors } from '@/constants/theme';

export const ID_TYPES = {
  PRINCIPAL_ID: 'Principal ID',
  ACCOUNT_ID: 'Account ID',
};

export const getIdInfo = (principal, accountId, idType) =>
  ({
    [ID_TYPES.PRINCIPAL_ID]: {
      description: t('deposit.principalIdDesc'),
      id: principal,
      colors: [Colors.Rainbow.Teal, Colors.Rainbow.Green],
    },
    [ID_TYPES.ACCOUNT_ID]: {
      description: t('deposit.accountIdDesc'),
      id: accountId,
      colors: [Colors.Rainbow.Purple, Colors.Rainbow.Blue],
    },
  }[idType] || null);
