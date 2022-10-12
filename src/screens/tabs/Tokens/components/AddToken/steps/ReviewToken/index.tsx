import { t } from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import RainbowButton from '@/components/buttons/RainbowButton';
import { Text } from '@/components/common';
import TokenItem from '@/components/tokens/TokenItem';
import { DABToken } from '@/interfaces/dab';
import { StandardToken } from '@/interfaces/keyring';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCustomToken } from '@/redux/slices/user';
import { getTokenBalance } from '@/services/DAB';
import TokenIcon from '@/tokens/TokenIcon';

import { parseToken } from '../../utils';
import styles from './styles';

interface Props {
  token?: DABToken | StandardToken;
  onClose: () => void;
}

export function ReviewToken({ token, onClose }: Props) {
  const principal = useAppSelector(
    state => state.keyring?.currentWallet?.principal
  );
  const { icpPrice } = useAppSelector(state => state.icp);
  const [balance, setBalance] = useState<{ amount: number; value?: number }>();
  const [error, setError] = useState<string>();
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const dispatch = useAppDispatch();

  function renderError() {
    return (
      <View style={styles.tokenContainer}>
        <TokenIcon logo={token?.logo} />
        <View style={styles.errorTextContainer}>
          <Text type="body1" style={styles.errorTitle}>
            {token?.name}
          </Text>
          <Text type="body1" style={styles.errorSubtitle}>
            {error}
          </Text>
        </View>
      </View>
    );
  }

  function renderToken() {
    return (
      <View style={[styles.tokenContainer, loadingBalance && styles.loader]}>
        {loadingBalance ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <TokenItem
            token={{
              ...token,
              value: balance?.value,
              amount: balance?.amount,
            }}
          />
        )}
      </View>
    );
  }

  const handleErrorBalance = useCallback((msg: string) => {
    setError(msg);
  }, []);

  const handleAddToken = () => {
    if (token) {
      setLoadingRegister(true);
      setError(undefined);
      dispatch(
        addCustomToken({
          token,
          onSuccess: () => {
            onClose?.();
            setLoadingRegister(false);
          },
          onError: () => {
            setError(t('addToken.addError'));
            setLoadingRegister(false);
          },
        })
      );
    }
  };

  useEffect(() => {
    const _getBalance = async () => {
      if (principal) {
        setLoadingBalance(true);
        const res = await getTokenBalance(token!, principal);
        if ('error' in res) {
          handleErrorBalance(t('addToken.balanceError'));
        } else {
          setBalance(parseToken(token?.symbol!, res, icpPrice));
        }
        setLoadingBalance(false);
      }
    };
    _getBalance();
  }, [token, principal]);

  return (
    <View style={styles.container}>
      <Text type="body1" style={styles.alert}>
        {t('addToken.safetyAlert')}
      </Text>
      {error ? renderError() : renderToken()}
      <RainbowButton
        text={t('addToken.addButton')}
        onPress={handleAddToken}
        disabled={loadingBalance || !!error}
        loading={loadingRegister}
      />
    </View>
  );
}
