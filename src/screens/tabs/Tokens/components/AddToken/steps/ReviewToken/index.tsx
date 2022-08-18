import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RainbowButton from '@/components/buttons/RainbowButton';
import { Image, Text } from '@/components/common';
import TokenFormat from '@/components/formatters/TokenFormat';
import UsdFormat from '@/components/formatters/UsdFormat';
import IncognitoLogo from '@/components/icons/svg/Incognito.svg';
import { DABToken } from '@/interfaces/dab';
import { addCustomToken } from '@/redux/slices/user';
import { getTokenBalance } from '@/services/DAB';

import { parseToken } from '../../utils';
import styles, { incognitoColor, loaderColor } from './styles';

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

  function renderToken() {
    return (
      <View style={styles.tokenContainer}>
        {loadingBalance ? (
          <ActivityIndicator color={loaderColor} size="small" />
        ) : (
          <>
            {token?.thumbnail || token?.logo ? (
              <Image url={token.thumbnail || token.logo} style={styles.logo} />
            ) : (
              <View style={[styles.logo, styles.incognitoLogo]}>
                <IncognitoLogo fill={incognitoColor} width={34} height={34} />
              </View>
            )}
            <View style={styles.textContainer}>
              <View style={styles.topRow}>
                <Text type="body2" numberOfLines={1} style={styles.textWhite}>
                  {token?.name}
                </Text>
                {balance?.value && (
                  <UsdFormat value={balance?.value} style={styles.textWhite} />
                )}
              </View>
              {token && balance && (
                <TokenFormat
                  value={balance.amount}
                  token={token.symbol}
                  style={styles.amount}
                />
              )}
            </View>
          </>
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
