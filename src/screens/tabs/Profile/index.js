import { useScrollToTop } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import EmptyState from '@/commonComponents/EmptyState';
import ErrorState from '@/commonComponents/ErrorState';
import Header from '@/commonComponents/Header';
import UserIcon from '@/commonComponents/UserIcon';
import Button from '@/components/buttons/Button';
import { ERROR_TYPES } from '@/constants/general';
import { ENABLE_NFTS } from '@/constants/nfts';
import { Colors } from '@/constants/theme';
import { Container, Separator } from '@/layout';
import { getTransactions, setTransactionsLoading } from '@/redux/slices/user';
import ActivityItem, {
  ITEM_HEIGHT,
} from '@/screens/tabs/components/ActivityItem';

import Accounts from './screens/Accounts';
import Settings from './screens/Settings';
import styles from './styles';

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const transactionListRef = useRef(null);
  useScrollToTop(transactionListRef);
  const { currentWallet } = useSelector(state => state.keyring);
  const { icpPrice } = useSelector(state => state.icp);
  const { transactions, transactionsLoading, transactionsError } = useSelector(
    state => state.user,
    shallowEqual
  );
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

  const renderTransaction = ({ item }, index) =>
    item?.symbol === 'NFT' && !ENABLE_NFTS ? null : (
      <ActivityItem key={`${item.date}${item.hash}`} {...item} />
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
            text={t('common.change')}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            onPress={openAccounts}
          />
        </View>
        <Separator />
        <Text style={styles.title}>{t('activity.title')}</Text>
        {!transactionsError ? (
          <FlatList
            ref={transactionListRef}
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={(_, index) => index}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            getItemLayout={(_, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
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
                title={t('activity.emptyTitle')}
                text={t('activity.emptySubtitle')}
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
