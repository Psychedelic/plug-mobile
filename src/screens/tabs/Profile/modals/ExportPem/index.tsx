import { t } from 'i18next';
import React, { RefObject, useState } from 'react';
import { ActivityIndicator, Share, View } from 'react-native';
import { Dirs, FileSystem } from 'react-native-file-access';
import { Modalize } from 'react-native-modalize';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RainbowButton from '@/components/buttons/RainbowButton';
import {
  ActionButton,
  CustomCheckbox,
  Header,
  Modal,
  PasswordInput,
  Text,
} from '@/components/common';
import { isIos } from '@/constants/platform';
import useCustomToast from '@/hooks/useCustomToast';
import { Wallet } from '@/interfaces/redux';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPemFile, validatePassword } from '@/redux/slices/keyring';
import shortAddress from '@/utils/shortAddress';

import AccountShowcase from './components/AccountShowcase';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
}

function ExportPem({ modalRef }: Props) {
  const { wallets, currentWallet } = useAppSelector(state => state.keyring);
  const dispatch = useAppDispatch();
  const toast = useCustomToast();
  const { bottom } = useSafeAreaInsets();

  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [safeCheck, setSafeCheck] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet>(currentWallet!);
  const disableButton = error || !safeCheck || password === '';

  const handleOnChange = (text: string) => {
    setError(false);
    setPassword(text);
  };

  const handleSubmitPassword = async () => {
    setLoading(true);
    dispatch(
      validatePassword({
        password,
        onError: () => {
          setError(true);
          setLoading(false);
        },
        onSuccess: () => {
          setLoggedIn(true);
          setLoading(false);
        },
      })
    );
  };

  const handleExportPem = () => {
    dispatch(
      getPemFile({
        walletId: selectedWallet.walletId,
        onFailure: () => {
          toast.showError(
            t('exportPem.error.title'),
            t('exportPem.error.message')
          );
          modalRef.current?.close();
        },
        onSuccess: async (content: string) => {
          const fileName = `${
            selectedWallet.icnsData?.reverseResolvedName || selectedWallet.name
          }.pem`;
          const path = `${Dirs.CacheDir}/${fileName}`;
          await FileSystem.writeFile(path, content);

          if (isIos) {
            const response = await Share.share({
              url: path,
              title: fileName,
            });
            if (response.action === Share.sharedAction) {
              toast.showSuccess(
                t('exportPem.success.title'),
                t('exportPem.success.messageIos')
              );
            } else {
              toast.showError(
                t('exportPem.error.title'),
                t('exportPem.error.message')
              );
            }
          } else {
            await FileSystem.cpExternal(path, fileName, 'downloads');
            toast.showSuccess(
              t('exportPem.success.title'),
              t('exportPem.success.messageAndroid')
            );
          }
          modalRef.current?.close();
        },
      })
    );
  };

  const renderAccount = (account: Wallet) => {
    const { name, walletId, icon, principal } = account;
    return (
      <AccountShowcase
        icon={icon}
        key={walletId}
        subtitle={shortAddress(principal)}
        selected={selectedWallet.walletId === walletId}
        onPress={() => setSelectedWallet(account)}
        title={account?.icnsData?.reverseResolvedName || name}
      />
    );
  };

  const resetState = () => {
    setError(false);
    setPassword('');
    setLoading(false);
    setLoggedIn(false);
    setSafeCheck(false);
    setSelectedWallet(currentWallet!);
  };

  const handleClose = () => {
    modalRef.current?.close();
    resetState();
  };

  return (
    <Modal
      modalRef={modalRef}
      adjustToContentHeight
      onClosed={resetState}
      HeaderComponent={
        <Header
          right={
            <ActionButton onPress={handleClose} label={t('common.close')} />
          }
          center={
            <Text type="subtitle2">{t('settings.items.exportPem.name')}</Text>
          }
        />
      }>
      <View style={[styles.container, !!bottom && styles.extraMargin]}>
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : loggedIn ? (
          <>
            <Text type="body1" style={styles.selectAccountTitle}>
              {t('exportPem.selectAccount')}
            </Text>
            <View style={styles.accountsContainer}>
              {wallets?.map(renderAccount)}
            </View>
          </>
        ) : (
          <>
            <PasswordInput
              error={error}
              value={password}
              onChangeText={handleOnChange}
            />
            <CustomCheckbox
              selected={safeCheck}
              onPress={() => setSafeCheck(!safeCheck)}
              label={t('exportPem.safeCheck')}
              labelProps={{ type: 'caption', style: styles.safeCheckLabel }}
              style={styles.checkbox}
            />
          </>
        )}
        <RainbowButton
          text={loggedIn ? t('exportPem.downloadPem') : t('common.continue')}
          disabled={disableButton}
          onPress={loggedIn ? handleExportPem : handleSubmitPassword}
        />
      </View>
    </Modal>
  );
}

export default ExportPem;
