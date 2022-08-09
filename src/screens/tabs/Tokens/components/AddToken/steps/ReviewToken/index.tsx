import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';

import RainbowButton from '@/components/buttons/RainbowButton';
import Image from '@/components/common/Image';
import Text from '@/components/common/Text';
import TokenFormat from '@/components/formatters/TokenFormat';
import UsdFormat from '@/components/formatters/UsdFormat';
import { DABToken } from '@/interfaces/dab';
import { getTokenBalance } from '@/services/DAB';

import { parseToken } from '../../utils';
import styles, { loaderColor } from './styles';

interface Props {
  token?: DABToken;
}

export function ReviewToken({ token }: Props) {
  const { principal } = useSelector(state => state.keyring?.currentWallet);
  const { icpPrice } = useSelector(state => state.icp);
  const [balance, setBalance] = useState<{ amount: number; value?: number }>();
  const [loading, setLoading] = useState(true);

  function renderToken() {
    return (
      <View style={styles.tokenContainer}>
        {loading ? (
          <ActivityIndicator color={loaderColor} size="small" />
        ) : (
          <>
            <Image url={token?.thumbnail} style={styles.logo} />
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

  useEffect(() => {
    const getBalance = async () => {
      setLoading(true);
      const res = await getTokenBalance(token!, principal);
      setBalance(parseToken(token!, res, icpPrice));
      setLoading(false);
    };
    getBalance();
  }, [token]);

  console.log(balance);

  return (
    <View style={styles.container}>
      <Text type="body1" style={styles.alert}>
        {t('addToken.safetyAlert')}
      </Text>
      {renderToken()}
      <RainbowButton
        text={t('addToken.addButton')}
        onPress={() => {}}
        disabled={loading}
      />
    </View>
  );
}
