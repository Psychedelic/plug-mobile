import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ErrorState from '@/commonComponents/ErrorState';
import Text from '@/components/common/Text';
import TokenItem from '@/components/tokens/TokenItem';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import { Container, Row, Separator } from '@/layout';
import { getBalance, setAssetsLoading } from '@/redux/slices/user';
import Send from '@/screens/flows/Send';

import WalletHeader from '../components/WalletHeader';
import styles from './styles';

function Tokens() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedToken, setSelectedToken] = useState(null);
  const sendRef = useRef(null);
  const { assets, assetsLoading, assetsError } = useSelector(
    state => state.user
  );

  const [refreshing, setRefresing] = useState(assetsLoading);
  const usdSum = Number(
    assets.reduce((total, token) => total + Number(token?.value), 0)
  ).toFixed(2);

  useEffect(() => {
    setRefresing(assetsLoading);
  }, [assetsLoading]);

  const onRefresh = () => {
    setRefresing(true);
    dispatch(setAssetsLoading(true));
    dispatch(getBalance());
  };

  const handleRefresh = () => {
    onRefresh();
  };

  const openSend = token => () => {
    setSelectedToken(token);
    sendRef.current?.open();
  };

  return (
    <Container>
      <WalletHeader />
      <Row style={styles.rowStyle}>
        <Text style={styles.title}>{t('common.tokens')}</Text>
        <Text style={styles.title}>{`$${usdSum}`}</Text>
      </Row>
      <Separator />
      {!assetsError ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.White.Primary}
            />
          }>
          {assets?.map(token => (
            <TokenItem
              {...token}
              key={token.symbol}
              color={Colors.Gray.Tertiary}
              onPress={openSend(token)}
              style={styles.tokenItem}
            />
          ))}
        </ScrollView>
      ) : (
        <ErrorState
          onPress={handleRefresh}
          errorType={ERROR_TYPES.FETCH_ERROR}
        />
      )}
      <Send modalRef={sendRef} token={selectedToken} />
    </Container>
  );
}

export default Tokens;
