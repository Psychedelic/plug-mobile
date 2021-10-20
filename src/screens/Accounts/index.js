import React from 'react';
import { StyleSheet } from 'react-native';
import Header from '../../components/common/Header';
import Modal from '../../components/modal';
import { FontStyles } from '../../constants/theme';
import { View, Text } from 'react-native';
import Icon from '../../components/icons';
import Row from '../../components/layout/Row';
import Touchable from '../../components/animations/Touchable';
import useAccounts from '../../hooks/useAccounts';
import AccountItem from '../../components/common/AccountItem';

const Accounts = ({ modalRef, handleClose, ...props }) => {
  const { accounts, onCreate, onDelete } = useAccounts();

  return (
    <Modal adjustToContentHeight modalRef={modalRef} onClose={handleClose} {...props}>
      <Header
        center={
          <Text style={FontStyles.Subtitle2}>Accounts</Text>
        }
      />
      <View style={styles.content}>

        {
          accounts.map(account => (
            <AccountItem account={account} />
          ))
        }

        <Touchable>
          <Row align='center' style={{ marginBottom: 20 }}>
            <Icon name='plus' />
            <Text style={FontStyles.Normal}>  Create Account</Text>
          </Row>
        </Touchable>
      </View>
    </Modal>
  )
}

export default Accounts;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  }
})
