import i18n from '@/config/i18n';

export const getRouteName = (name: string) => {
  return i18n.t(`routes.${name}`) || name;
};
