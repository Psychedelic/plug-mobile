import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RainbowButton from '@/components/buttons/RainbowButton';
import { Text } from '@/components/common';
import TokenItem from '@/components/tokens/TokenItem';
import { DABToken } from '@/interfaces/dab';
import { addCustomToken } from '@/redux/slices/user';
import { getTokenBalance } from '@/services/DAB';

import { parseToken } from '../../utils';
import styles from './styles';

interface Props {
  token?: DABToken;
  onClose: () => void;
}

export function ReviewToken({ token, onClose }: Props) {
  const { principal } = useSelector(state => state.keyring?.currentWallet);
  const { icpPrice } = useSelector(state => state.icp);
  const [balance, setBalance] = useState<{ amount: number; value?: number }>();
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const dispatch = useDispatch();
  console.log('balance', balance);
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

  const handleAddToken = () => {
    setLoadingRegister(true);
    dispatch(
      addCustomToken({
        token,
        onSuccess: () => {
          onClose?.();
          setLoadingRegister(false);
        },
      })
    );
  };

  useEffect(() => {
    const _getBalance = async () => {
      setLoadingBalance(true);
      const res = await getTokenBalance(token!, principal);
      setBalance(parseToken(token!, res, icpPrice));
      setLoadingBalance(false);
    };
    _getBalance();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text type="body1" style={styles.alert}>
        {t('addToken.safetyAlert')}
      </Text>
      {renderToken()}
      <RainbowButton
        text={t('addToken.addButton')}
        onPress={handleAddToken}
        disabled={loadingBalance}
        loading={loadingRegister}
      />
    </View>
  );
}
