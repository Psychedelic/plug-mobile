import React, { useRef, useState } from 'react';
import { StyleSheet, ActionSheetIOS, ActivityIndicator } from 'react-native';
import Header from '../../components/common/Header';
import Modal from '../../components/modal';
import { FontStyles } from '../../constants/theme';
import { View, Text } from 'react-native';
import Icon from '../../components/icons';
import Row from '../../components/layout/Row';
import Touchable from '../../components/animations/Touchable';
import AccountItem from '../../components/common/AccountItem';
import CreateEditAccount from '../../modals/CreateEditAccount';
import { useDispatch, useSelector } from 'react-redux';
import shortAddress from '../../helpers/short-address';
import { reset, setCurrentPrincipal } from '../../redux/slices/keyring';
import { useICPPrice } from '../../redux/slices/icp';

const Accounts = ({ modalRef, onClose, ...props }) => {
  const { wallets } = useSelector(state => state.keyring);
  const icpPrice = useICPPrice();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const createEditAccountRef = useRef(null);

  const onCreateAccount = () => {
    setSelectedAccount(null);
    createEditAccountRef.current?.open();
  };

  const onEditAccount = account => {
    setSelectedAccount(account);
    createEditAccountRef.current?.open();
  };

  const onChangeAccount = walletNumber => {
    setLoading(true);
    dispatch(reset());
    console.log('walletNumber', walletNumber);
    dispatch(setCurrentPrincipal({ walletNumber, icpPrice }))
      .unwrap()
      .then((_result) => {
        setLoading(false);
        modalRef.current?.close();
      });
  }

  const onLongPress = account => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: account.name,
        message: shortAddress(account.principal),
        options: ['Cancel', 'Edit Account'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            onEditAccount(account);
            break;
        }
      },
    );
  };

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      {...props}>

      <Header center={<Text style={FontStyles.Subtitle2}>Accounts</Text>} />

      <View style={styles.content}>
        {
          loading
          && (
            <View style={styles.loading}>
              <ActivityIndicator
                style={StyleSheet.absoluteFill}
                color='white'
              />
            </View>
          )
        }
        {
          wallets?.map(account => (
            <AccountItem
              account={account}
              key={account?.walletNumber}
              onMenu={() => onLongPress(account)}
              onPress={() => onChangeAccount(account?.walletNumber)}
            />
          ))
        }

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
    zIndex: 0,
  },
  loading: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});
