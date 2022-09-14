import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import EmptyState from '@/commonComponents/EmptyState';
import ErrorState from '@/commonComponents/ErrorState';
import Header from '@/commonComponents/Header';
import UserIcon from '@/commonComponents/UserIcon';
import Button from '@/components/buttons/Button';
import Text from '@/components/common/Text';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import { Container, Separator } from '@/layout';
import { getTransactions } from '@/redux/slices/user';
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
  const { reverseResolvedName } = useSelector(
    state => state.keyring.currentWallet?.icnsData
  );

  const { currentWallet } = useSelector(state => state.keyring);
  const { icpPrice } = useSelector(state => state.icp);
  const { transactions, transactionsLoading, transactionsError } = useSelector(
    state => state.user,
    shallowEqual
  );

  const onRefresh = () => {
    dispatch(getTransactions({ icpPrice }));
  };

  const renderTransaction = ({ item }) => <ActivityItem {...item} />;

  return (
    <>
      <Container>
        <Header left={<Settings />} />
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <UserIcon
              icon={currentWallet?.icon}
              size="large"
              onPress={modalRef.current?.open}
            />
            <Text
              type="subtitle1"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.name}>
              {reverseResolvedName || currentWallet?.name}
            </Text>
          </View>
          <Button
            text={t('common.change')}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            onPress={modalRef.current?.open}
          />
        </View>
        <Separator />
        <Text style={styles.title}>{t('activity.title')}</Text>
        {!transactionsError ? (
          <FlashList
            ref={transactionListRef}
            data={transactions}
            renderItem={renderTransaction}
            keyExtractor={item => `${item.date}${item.hash}`}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            estimatedItemSize={ITEM_HEIGHT}
            refreshControl={
              <RefreshControl
                refreshing={transactionsLoading}
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
