import { RefreshControl, ScrollView, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ERROR_TYPES } from '../../../../components/common/ErrorState/constants';
import { getAssets, setAssetsLoading } from '../../../../redux/slices/user';
import ErrorState from '../../../../components/common/ErrorState';
import { Colors, FontStyles } from '../../../../constants/theme';
import TokenItem from '../../../../components/tokens/TokenItem';
import Container from '../../../../components/common/Container';
import Divider from '../../../../components/common/Divider';
import { getICPPrice } from '../../../../redux/slices/icp';
import WalletHeader from '../../components/WalletHeader';
import Row from '../../../../components/layout/Row';
import Send from '../../../../screens/Send';

function Tokens() {
  const dispatch = useDispatch();
  const [selectedToken, setSelectedToken] = useState(null);
  const sendRef = useRef(null);
  const { assets, assetsLoading, assetsError } = useSelector(
    state => state.user,
  );
  const { icpPrice } = useSelector(state => state.icp);
  const [refreshing, setRefresing] = useState(assetsLoading);
  const usdSum = Number(
    assets.reduce((total, token) => total + Number(token?.value), 0),
  ).toFixed(2);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  useEffect(() => {
    setRefresing(assetsLoading);
  }, [assetsLoading]);

  const onRefresh = () => {
    dispatch(getICPPrice());
    setRefresing(true);
    dispatch(setAssetsLoading(true));
    dispatch(getAssets({ refresh: true, icpPrice }));
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
        <Text style={styles.title}>Tokens</Text>
        <Text style={styles.title}>{`$${usdSum}`}</Text>
      </Row>
      <Divider />
      {!assetsError ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.White.Primary}
            />
          }>
          {assets?.map(token => (
            <TokenItem
              key={token.symbol}
              {...token}
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

const styles = StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
  tokenItem: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  rowStyle: {
    justifyContent: 'space-between',
    paddingRight: 20,
  },
});
