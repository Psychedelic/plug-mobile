import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { shallowEqual } from 'react-redux';

import Button from '@/components/buttons/Button';
import {
  EmptyState,
  ErrorState,
  Header,
  Text,
  Touchable,
  UserIcon,
} from '@/components/common';
import Icon from '@/components/icons';
import { ERROR_TYPES } from '@/constants/general';
import { Colors } from '@/constants/theme';
import { ScreenProps } from '@/interfaces/navigation';
import { Transaction } from '@/interfaces/redux';
import { Container, Separator } from '@/layout';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTransactions } from '@/redux/slices/user';
import ActivityItem, {
  ITEM_HEIGHT,
} from '@/screens/tabs/components/ActivityItem';
import animationScales from '@/utils/animationScales';

import Accounts from './modals/Accounts';
import ActivityDetail from './modals/ActivityDetail';
import styles from './styles';

function Profile({ navigation }: ScreenProps<Routes.PROFILE>) {
  const accountsModalRef = useRef<Modalize>(null);
  const activityDetailModalRef = useRef<Modalize>(null);
  const transactionListRef = useRef(null);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  useScrollToTop(transactionListRef);
  const dispatch = useAppDispatch();
  const reverseResolvedName = useAppSelector(
    state => state.keyring.currentWallet?.icnsData?.reverseResolvedName
  );
  const { currentWallet } = useAppSelector(state => state.keyring);
  const { icpPrice } = useAppSelector(state => state.icp);
  const { transactions, transactionsLoading, transactionsError } =
    useAppSelector(state => state.user, shallowEqual);

  useEffect(() => {
    if (selectedTransaction) {
      activityDetailModalRef.current?.open();
    }
  }, [selectedTransaction]);

  const onRefresh = () => {
    dispatch(getTransactions({ icpPrice }));
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <ActivityItem
      {...item}
      onPress={() => {
        setSelectedTransaction(item);
      }}
    />
  );

  return (
    <>
      <Container>
        <Header
          left={
            <Touchable
              scale={animationScales.medium}
              onPress={() => navigation.navigate(Routes.SETTINGS_STACK)}>
              <Icon name="gear" color={Colors.White.Primary} />
            </Touchable>
          }
        />
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <UserIcon
              icon={currentWallet?.icon}
              size="large"
              onPress={accountsModalRef.current?.open}
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
            onPress={() => accountsModalRef.current?.open()}
          />
        </View>
        <Separator />
        <Text style={styles.title}>{t('activity.title')}</Text>
        {!transactionsError ? (
          <View style={styles.listContainer}>
            <FlashList
              ref={transactionListRef}
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={item => `${item.date}${item.hash}`}
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
              estimatedItemSize={ITEM_HEIGHT}
              refreshing={transactionsLoading}
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
          </View>
        ) : (
          <ErrorState
            onPress={onRefresh}
            loading={transactionsLoading}
            errorType={ERROR_TYPES.FETCH_ERROR}
          />
        )}
      </Container>
      <Accounts modalRef={accountsModalRef} />
      <ActivityDetail
        modalRef={activityDetailModalRef}
        activity={selectedTransaction!}
        onClosed={() => setSelectedTransaction(undefined)}
      />
    </>
  );
}

export default Profile;
