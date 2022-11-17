import { t } from 'i18next';
import { ImageSourcePropType } from 'react-native';

import createAccountIcon from './assets/createIcon.png';
import pemFileIcon from './assets/pemFileIcon.png';
import privateKeyIcon from './assets/privateKeyIcon.png';

export interface Button {
  id: string;
  title: string;
  onPress: () => void;
  icon: ImageSourcePropType;
  colors: string[];
}

export const getCreateImportButtons = ({
  openCreateAccountModal,
  openImportKeyModal,
  openFile,
}: {
  openCreateAccountModal: () => void;
  openImportKeyModal: () => void;
  openFile: () => void;
}) =>
  [
    {
      id: 'create',
      title: t('createImportAccount.create'),
      onPress: openCreateAccountModal,
      icon: createAccountIcon,
      colors: ['#00E8FF', '#44DC45'],
    },
    {
      id: 'importKey',
      title: t('createImportAccount.importKey'),
      onPress: openImportKeyModal,
      icon: privateKeyIcon,
      colors: ['#FB5DC3', '#FDB943'],
    },
    {
      id: 'importPem',
      title: t('createImportAccount.importPem'),
      onPress: openFile,
      icon: pemFileIcon,
      colors: ['#36C3E9', '#CF6ED3'],
    },
  ] as Button[];
