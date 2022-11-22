import { t } from 'i18next';

export const getPemImportError = (error: string) => {
  switch (error) {
    case 'invalid-key':
      return t('createImportAccount.invalidKey');
    case 'added-account':
      return t('createImportAccount.alreadyImported');
    default:
      return t('createImportAccount.importError');
  }
};
