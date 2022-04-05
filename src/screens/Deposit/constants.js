import { Colors } from '../../constants/theme';

export const ID_TYPES = {
  PRINCIPAL_ID: 'Principal ID',
  ACCOUNT_ID: 'Account ID',
};

export const getIdInfo = (principal, accountId, idType) =>
  ({
    [ID_TYPES.PRINCIPAL_ID]: {
      description:
        "Use when receiving from Plug accounts & users, or other apps that support sending directly to Principal ID's.",
      id: accountId,
      colors: [Colors.Rainbow.Teal, Colors.Rainbow.Green],
    },
    [ID_TYPES.ACCOUNT_ID]: {
      description:
        "Use when receiving from exchanges, or other apps that only support sending to Accounts ID's.",
      id: principal,
      colors: [Colors.Rainbow.Purple, Colors.Rainbow.Blue],
    },
  }[idType] || null);
