import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Text, View, FlatList, RefreshControl } from 'react-native';

import { getTransactions, setTransactionsLoading } from '@redux/slices/user';
import { ERROR_TYPES } from '@commonComponents/ErrorState/constants';
import ActivityItem from '@screens/tabs/components/ActivityItem';
import ErrorState from '@commonComponents/ErrorState';
import EmptyState from '@commonComponents/EmptyState';
import Container from '@commonComponents/Container';
import UserIcon from '@commonComponents/UserIcon';
import Button from '@components/buttons/Button';
import Header from '@commonComponents/Header';
import { ENABLE_NFTS } from '@constants/nfts';
import { Colors } from '@constants/theme';
import { Separator } from '@layout';

import Settings from './screens/Settings';
import Accounts from './screens/Accounts';
import styles from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const transactionListRef = useRef(null);
  const { currentWallet } = useSelector(state => state.keyring);
  const { icpPrice } = useSelector(state => state.icp);
  const {
    transactions,
    transactionsLoading,
    transactionsError,
    scrollOnProfile,
  } = useSelector(state => state.user, shallowEqual);
  const [refreshing, setRefresing] = useState(transactionsLoading);

  const openAccounts = () => {
    modalRef?.current.open();
  };

  const onRefresh = () => {
    setRefresing(true);
    dispatch(setTransactionsLoading(true));
    dispatch(getTransactions({ icpPrice }));
  };

  useEffect(() => {
    setRefresing(transactionsLoading);
  }, [transactionsLoading]);

  useEffect(() => {
    if (scrollOnProfile) {
      transactionListRef?.current?.scrollToIndex({ index: 0 });
    }
  }, [scrollOnProfile]);

  const renderTransaction = ({ item }, index) =>
    item?.symbol === 'NFT' && !ENABLE_NFTS ? null : (
      <ActivityItem key={index} {...item} />
    );

  return (
    <>
      <Container>
        <Header left={<Settings />} />
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <UserIcon
              icon={currentWallet?.icon}
              size="large"
              onPress={openAccounts}
            />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {currentWallet?.name}
            </Text>
          </View>
          <Button
            variant="gray"
            text="Change"
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            onPress={openAccounts}
          />
        </View>
        <Separator />
        <Text style={styles.title}>Activity</Text>
        {!transactionsError ? (
          <FlatList
            ref={transactionListRef}
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(_, index) => index}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.White.Primary}
              />
            }
            ListEmptyComponent={
              <EmptyState
                style={styles.emptyState}
                title="You have no activity yet"
                text="When you do, they'll show here, where you will see their traits and send them."
              />
            }
          />
        ) : (
          <ErrorState
            onPress={onRefresh}
            loading={transactionsLoading}
            errorType={ERROR_TYPES.FETCH_ERROR}
          />
        )}
      </Container>
      <Accounts modalRef={modalRef} />
    </>
  );
};

export default Profile;
