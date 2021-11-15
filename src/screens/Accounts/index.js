import React, { useRef, useState } from 'react';
import { StyleSheet, ActionSheetIOS } from 'react-native';
import Header from '../../components/common/Header';
import Modal from '../../components/modal';
import { FontStyles } from '../../constants/theme';
import { View, Text } from 'react-native';
import Icon from '../../components/icons';
import Row from '../../components/layout/Row';
import Touchable from '../../components/animations/Touchable';
import useAccounts from '../../hooks/useAccounts';
import AccountItem from '../../components/common/AccountItem';
import CreateEditAccount from './components/CreateEditAccount';
import { useSelector } from 'react-redux';

const Accounts = ({ modalRef, handleClose, ...props }) => {
  const { accounts, onDelete } = useAccounts();

  const { wallets } = useSelector(state => state.keyring);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const createEditAccountRef = useRef(null);

  const onCreateAccount = () => {
    createEditAccountRef.current?.open();
  };

  const onEditAccount = account => {
    setSelectedAccount(account);
    createEditAccountRef.current?.open();
  };

  const onLongPress = account => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Edit Account', 'Delete Account'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            onEditAccount(account);
            break;
          case 2:
            onDelete(account);
            break;
        }
      },
    );
  };

  console.log('wallets', wallets);

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      onClose={handleClose}
      {...props}>
      <Header center={<Text style={FontStyles.Subtitle2}>Accounts</Text>} />
      <View style={styles.content}>
        {wallets?.map(account => (
          <AccountItem account={account} key={account.walletNumber} />
        ))}

        <Touchable onPress={onCreateAccount}>
          <Row align="center" style={{ marginBottom: 30, marginTop: 10 }}>
            <Icon name="plus" />
            <Text style={FontStyles.Normal}> Create account</Text>
          </Row>
        </Touchable>

        <CreateEditAccount
          modalRef={createEditAccountRef}
          account={selectedAccount}
        />
      </View>
    </Modal>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
