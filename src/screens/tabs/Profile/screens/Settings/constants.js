import { t } from 'i18next';
import { Linking } from 'react-native';

export const infoItems = [
  {
    name: t('settings.infoItems.docs'),
    onPress: () => Linking.openURL('https://docs.plugwallet.ooo'),
  },
  {
    name: t('settings.infoItems.blog'),
    onPress: () => Linking.openURL('https://medium.com/plugwallet'),
  },
  {
    name: t('settings.infoItems.twitter'),
    onPress: () => Linking.openURL('https://twitter.com/plug_wallet'),
  },
  {
    name: t('settings.infoItems.discord'),
    onPress: () => Linking.openURL('https://discord.plugwallet.ooo'),
  },
];
