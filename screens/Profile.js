import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Container from '../components/Container';
import Divider from '../components/Divider';
import Header from '../components/Header';
import AccountInfo from '../components/AccountInfo';
import { FontStyles } from '../constants/theme';
import Icon from '../components/icons/Icon';
import UserIcon from '../components/UserIcon';

const header = {
  left: <Icon name="gear" />,
  center: null,
  right: <Icon name="chevronRight" />,
};

const Profile = () => (
  <Container>
    <Header {...header} />
    <UserIcon size='big' icon='🔥' />
    <UserIcon size='medium' icon='🔥' />
    <UserIcon size='small' icon='🔥' />
    <Text style={styles.title}>sas</Text>
    <Divider />
  </Container>
)

export default Profile;

const styles = StyleSheet.create({
  title: {
    paddingLeft: 20,
    paddingBottom: 20,
    ...FontStyles.Title,
  },
});
