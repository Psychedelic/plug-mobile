import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';
import Container from '../../components/common/Container';
import Divider from '../../components/common/Divider';
import Header from '../../components/common/Header';
import UserIcon from '../../components/common/UserIcon';
import Icon from '../../components/icons';
import Button from '../../components/buttons/Button';
import Settings from '../Settings';
import ActivityItem from './components/ActivityItem';
import styles from './styles';
import Touchable from '../../components/animations/Touchable';
import Accounts from '../Accounts';
import { Colors } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import {
  getTransactions,
  setTransactionsLoading,
} from '../../redux/slices/keyring';
import { useDispatch } from 'react-redux';
import { useICPPrice } from '../../redux/slices/icp';
import Routes from '../../navigation/Routes';

const Profile = () => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const navigation = useNavigation();
  const { currentWallet, transactions, transactionsLoading } = useSelector(
    state => state.keyring,
  );
  const [refreshing, setRefresing] = useState(transactionsLoading);
  const icpPrice = useICPPrice();

  const openAccounts = () => {
    modalRef?.current.open();
  };

  const onRefresh = () => {
    dispatch(setTransactionsLoading(true));
    dispatch(getTransactions({ icpPrice }));
  };

  useEffect(() => {
    onRefresh(); // move later to initial global loading
  }, []);

  useEffect(() => {
    setRefresing(transactionsLoading);
  }, [transactionsLoading]);

  return (
    <>
      <Container>
        <Header
          left={<Settings />}
          right={
            <Touchable
              onPress={() => navigation.navigate(Routes.WALLET_SCREEN)}>
              <Icon name="chevronRight" />
            </Touchable>
          }
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.White.Primary}
            />
          }>
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <UserIcon size="large" onPress={openAccounts} />
              <Text style={styles.name}>{currentWallet.name}</Text>
            </View>

            <Button
              variant="gray"
              text="Change"
              buttonStyle={{ width: 90 }}
              textStyle={{ fontSize: 16 }}
              onPress={openAccounts}
            />
          </View>
          <Divider />
          <Text style={styles.title}>Activity</Text>
          <View>
            {transactions?.map((item, index) => (
              <ActivityItem key={index} {...item} />
            ))}
          </View>
        </ScrollView>
      </Container>

      <Accounts modalRef={modalRef} />
    </>
  );
};

export default Profile;
