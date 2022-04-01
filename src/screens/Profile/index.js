import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Text, View, ScrollView, RefreshControl } from 'react-native';

import { ERROR_TYPES } from '../../components/common/ErrorState/constants';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';
import Container from '../../components/common/Container';
import UserIcon from '../../components/common/UserIcon';
import Divider from '../../components/common/Divider';
import Button from '../../components/buttons/Button';
import ActivityItem from './components/ActivityItem';
import { getICPPrice } from '../../redux/slices/icp';
import Header from '../../components/common/Header';
import { Colors } from '../../constants/theme';
import Settings from '../Settings';
import Accounts from '../Accounts';
import {
  getTransactions,
  setTransactionsLoading,
} from '../../redux/slices/user';
import styles from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { currentWallet } = useSelector(state => state.keyring);
  const { icpPrice } = useSelector(state => state.icp);
  const { transactions, transactionsLoading, transactionsError } = useSelector(
    state => state.user,
    shallowEqual,
  );
  const [refreshing, setRefresing] = useState(transactionsLoading);

  const openAccounts = () => {
    modalRef?.current.open();
  };

  const onRefresh = () => {
    dispatch(setTransactionsLoading(true));
    dispatch(getTransactions({ icpPrice }));
  };

  useEffect(() => {
    setRefresing(transactionsLoading);
  }, [transactionsLoading]);

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
        <Divider />
        <Text style={styles.title}>Activity</Text>
        {!transactionsError ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.White.Primary}
              />
            }>
            <View>
              {transactions?.length > 0 ? (
                transactions?.map((item, index) => (
                  <ActivityItem key={index} {...item} />
                ))
              ) : (
                <EmptyState
                  style={styles.emptyState}
                  title="You have no activity yet"
                  text="When you do, they'll show here, where you will see their traits and send them."
                />
              )}
            </View>
          </ScrollView>
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
