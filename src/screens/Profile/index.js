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
import useKeyring from '../../hooks/useKeyring';
import { Colors } from '../../constants/theme';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

const Profile = () => {
  const modalRef = useRef(null);
  const navigation = useNavigation();
  const { currentWallet } = useSelector(state => state.keyring);
  const [refreshing, setRefresing] = useState(false);
  const { activity } = useSelector(state => state.keyring);
  const { getActivity } = useKeyring();

  const openAccounts = () => {
    modalRef?.current.open();
  };

  const onRefresh = async () => {
    setRefresing(true);
    await getActivity();
    setRefresing(false);
  };

  useEffect(() => {
    const refresh = async () => {
      setRefresing(true);
      await getActivity();
      setRefresing(false);
    };
    refresh();
  }, []);

  return (
    <>
      <Container>
        <Header
          left={<Settings />}
          right={
            <Touchable onPress={() => navigation.navigate(Routes.WALLET_SCREEN)}>
              <Icon name="chevronRight" />
            </Touchable>
          } />
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
            {activity?.map((item, index) => (
              <ActivityItem key={index} {...item} />
            ))}
          </View>
        </ScrollView>
      </Container>


      <Accounts
        modalRef={modalRef}
      />

    </>
  );
};

export default Profile;
