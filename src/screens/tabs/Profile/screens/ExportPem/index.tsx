import { t } from 'i18next';
import React, { RefObject, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import RainbowButton from '@/components/buttons/RainbowButton';
import {
  ActionButton,
  Header,
  Modal,
  PasswordInput,
  Text,
} from '@/components/common';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import { Wallet } from '@/interfaces/redux';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { validatePassword } from '@/redux/slices/keyring';

import AccountShowcase from './components/AccountShowcase';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
}

function ExportPem({ modalRef }: Props) {
  const { wallets, currentWallet } = useAppSelector(state => state.keyring);
  const currentAccountId = currentWallet?.accountId!;
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [safeCheck, setSafeCheck] = useState(false);
  const [selectedAccountId, setSelectedAccountId] =
    useState<string>(currentAccountId);
  const disableButton = error || !safeCheck;

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
    // TODO: Add export pem logic
  };

  const renderAccount = (account: Wallet) => {
    const { name, accountId, icon, principal } = account;
    return (
      <AccountShowcase
        icon={icon}
        key={accountId}
        subtitle={principal}
        selected={selectedAccountId === accountId}
        onPress={() => setSelectedAccountId(accountId)}
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
    setSelectedAccountId(currentAccountId);
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
      <View style={styles.container}>
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
