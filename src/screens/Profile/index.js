import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import EmptyState from '../../components/common/EmptyState';
import Container from '../../components/common/Container';
import UserIcon from '../../components/common/UserIcon';
import { useDebounce } from '../../hooks/useDebounce';
import Divider from '../../components/common/Divider';
import Button from '../../components/buttons/Button';
import ActivityItem from './components/ActivityItem';
import { useICPPrice } from '../../redux/slices/icp';
import Header from '../../components/common/Header';
import { Colors } from '../../constants/theme';
import Routes from '../../navigation/Routes';
import Icon from '../../components/icons';
import Settings from '../Settings';
import Accounts from '../Accounts';
import {
  getTransactions,
  setTransactionsLoading,
} from '../../redux/slices/user';
import styles from './styles';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const icpPrice = useICPPrice();
  const { debounce } = useDebounce();
  const { currentWallet } = useSelector(state => state.keyring);
  const { transactions, transactionsLoading } = useSelector(
    state => state.user,
    shallowEqual,
  );
  const [refreshing, setRefresing] = useState(transactionsLoading);
  const [navigated, setNavigated] = useState(false);

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

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    setNavigated(false);
    return () => setNavigated(true);
  });

  const hanldeGoToWallet = () => {
    if (!navigated) {
      setNavigated(true);
      navigation.jumpTo(Routes.WALLET_SCREEN);
    }
  };

  return (
    <>
      <Container>
        <Header
          left={<Settings />}
          right={
            <TouchableOpacity onPress={() => debounce(hanldeGoToWallet)}>
              <Icon name="chevronRight" />
            </TouchableOpacity>
          }
        />
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.White.Primary}
            />
          }>
          <Text style={styles.title}>Activity</Text>
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
      </Container>
      <Accounts modalRef={modalRef} />
    </>
  );
};

export default Profile;
