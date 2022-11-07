import { t } from 'i18next';

import { ERROR_TYPES } from '@/constants/general';

interface ReturnProps {
  emoji: string;
  title: string;
  description: string;
  buttonTitle: string;
}

export const getErrorStateData = (type: string): ReturnProps | null =>
  ({
    [ERROR_TYPES.FETCH_ERROR]: t(`errors.${ERROR_TYPES.FETCH_ERROR}`, {
      returnObjects: true,
    }) as ReturnProps,
    [ERROR_TYPES.CONNECTION_ERROR]: t(
      `errors.${ERROR_TYPES.CONNECTION_ERROR}`,
      {
        returnObjects: true,
      }
    ) as ReturnProps,
    [ERROR_TYPES.ERROR_BOUNDARY]: t(`errors.${ERROR_TYPES.ERROR_BOUNDARY}`, {
      returnObjects: true,
    }) as ReturnProps,
  }[type] || null);
