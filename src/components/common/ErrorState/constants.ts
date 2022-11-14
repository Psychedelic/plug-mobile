import { t } from 'i18next';

import { ERROR_TYPES } from '@/constants/general';

export interface ErrorStateData {
  emoji: string;
  title: string;
  description: string;
  buttonTitle: string;
}

export const getErrorStateData = (type: ERROR_TYPES) =>
  ({
    [ERROR_TYPES.FETCH_ERROR]: t(`errors.${ERROR_TYPES.FETCH_ERROR}`, {
      returnObjects: true,
    }) as ErrorStateData,
    [ERROR_TYPES.CONNECTION_ERROR]: t(
      `errors.${ERROR_TYPES.CONNECTION_ERROR}`,
      {
        returnObjects: true,
      }
    ) as ErrorStateData,
    [ERROR_TYPES.ERROR_BOUNDARY]: t(`errors.${ERROR_TYPES.ERROR_BOUNDARY}`, {
      returnObjects: true,
    }) as ErrorStateData,
  }[type] || null);
