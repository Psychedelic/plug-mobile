import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, ScrollView, View } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { Modalize } from 'react-native-modalize';

import { ActionButton } from '@/components/common';
import Header from '@/components/common/Header';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import { blogUrl, discordUrl, docsUrl, twitterUrl } from '@/constants/urls';
import { ScreenProps } from '@/interfaces/navigation';
import { Separator } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { reset as resetICPStore } from '@/redux/slices/icp';
import { lock, reset as resetKeyringStore } from '@/redux/slices/keyring';
import { reset as resetUserStore } from '@/redux/slices/user';
import { clearState as resetWalletConnectStore } from '@/redux/slices/walletconnect';
import { clearStorage } from '@/utils/localStorage';

import DeleteWallet from './components/DeleteWallet';
import InfoItem from './components/InfoItem';
import SettingItem from './components/SettingItem';
import styles from './styles';

interface Option {
  name: string;
  description: string;
  onPress: () => void;
  icon?: string;
  iconName?: string;
}

function Settings({ navigation }: ScreenProps<Routes.SETTINGS>) {
  const { t } = useTranslation();
  const deleteWalletRef = useRef<Modalize>(null);

  const dispatch = useAppDispatch();
  const { biometricsAvailable } = useAppSelector(state => state.user);

  const openDeleteWallet = () => {
    deleteWalletRef.current?.open();
  };

  const handleDeleteWallet = () => {
    clearStorage();
    dispatch(resetUserStore());
    dispatch(resetICPStore());
    dispatch(resetWalletConnectStore());
    dispatch(resetKeyringStore());
    deleteWalletRef.current?.close();
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.WELCOME_SCREEN }],
    });
  };

  const lockAccount = () => {
    // modalRef.current?.close();
    dispatch(lock());
  };

  const renderSettingsItem = (item: Option, index: number) => {
    const isBiometrics = index === 2;
    return isBiometrics && !biometricsAvailable ? null : (
      <View key={item.name}>
        <SettingItem {...item} />
        {index + 1 !== settingsItems.length && <Separator />}
      </View>
    );
  };

  const settingsItems = useMemo(
    () => [
      {
        icon: '📓',
        name: t('settings.items.contacts.name'),
        description: t('settings.items.contacts.desc'),
        onPress: () => navigation.navigate(Routes.CONTACTS),
      },
      {
        icon: '🗝',
        name: t('settings.items.phrase.name'),
        description: t('settings.items.phrase.desc'),
        onPress: () => null,
      },
      {
        iconName: 'faceIdIcon',
        name: t('settings.items.biometric.name'),
        description: t('settings.items.biometric.desc'),
        onPress: () => null,
      },
      {
        icon: '📱️️️️',
        name: t('settings.items.connectedApps.name'),
        description: t('settings.items.connectedApps.desc'),
        onPress: () => null,
      },
      {
        icon: '🔒',
        name: t('settings.items.lock.name'),
        description: t('settings.items.lock.desc'),
        onPress: lockAccount,
      },
    ],
    []
  );

  const infoItems = useMemo(
    () => [
      {
        name: t('settings.infoItems.docs'),
        onPress: () => Linking.openURL(docsUrl),
      },
      {
        name: t('settings.infoItems.blog'),
        onPress: () => Linking.openURL(blogUrl),
      },
      {
        name: t('settings.infoItems.twitter'),
        onPress: () => Linking.openURL(twitterUrl),
      },
      {
        name: t('settings.infoItems.discord'),
        onPress: () => Linking.openURL(discordUrl),
      },
      {
        name: t('settings.infoItems.delete'),
        onPress: openDeleteWallet,
        destructive: true,
      },
    ],
    []
  );

  return (
    <>
      <Header
        center={<Text type="subtitle2">{t('settings.title')}</Text>}
        right={
          <ActionButton label={t('common.close')} onPress={navigation.goBack} />
        }
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        overScrollMode="never">
        <View>{settingsItems.map(renderSettingsItem)}</View>
        <View style={styles.infoContainer}>
          {infoItems.map(item => (
            <InfoItem {...item} key={item.name} />
          ))}
          <Text style={[FontStyles.SmallGray, styles.version]}>
            {t('settings.version', {
              version: getVersion(),
              build: getBuildNumber(),
            })}
          </Text>
        </View>
      </ScrollView>
      <DeleteWallet modalRef={deleteWalletRef} onDelete={handleDeleteWallet} />
    </>
  );
}

export default Settings;
