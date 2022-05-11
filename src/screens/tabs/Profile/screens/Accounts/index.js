import Clipboard from '@react-native-community/clipboard';
import React, { useEffect, useRef, useState } from 'react';
import { ActionSheetIOS, ActivityIndicator, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import Icon from '@/components/icons';
import { FontStyles } from '@/constants/theme';
import { Row } from '@/layout';
import { getICPPrice } from '@/redux/slices/icp';
import { reset, setCurrentPrincipal } from '@/redux/slices/keyring';
import { getNFTs } from '@/redux/slices/user';
import shortAddress from '@/utils/shortAddress';

import CreateEditAccount from '../CreateEditAccount';
import styles from './styles';

const Accounts = ({ modalRef, onClose, ...props }) => {
  const { wallets, currentWallet } = useSelector(state => state.keyring);
  const { icpPrice } = useSelector(state => state.icp);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState(null);

  const createEditAccountRef = useRef(null);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

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
    dispatch(setCurrentPrincipal({ walletNumber, icpPrice }))
      .unwrap()
      .then(() => {
        dispatch(getNFTs());
        setLoading(false);
        modalRef.current?.close();
      });
  };

  const onLongPress = account => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: account.name,
        message: shortAddress(account.principal),
        options: ['Cancel', 'Edit Account', 'Copy Address'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            onEditAccount(account);
            break;
          case 2:
            Clipboard.setString(account.principal);
            break;
        }
      },
    );
  };

  const renderAccountItem = (account, index) => {
    const handleOnPress = () => {
      if (currentWallet?.principal !== account.principal) {
        onChangeAccount(account?.walletNumber);
      }
    };

    return (
      <CommonItem
        key={index}
        name={account.name}
        image={account.icon}
        id={account.principal}
        onPress={handleOnPress}
        style={styles.accountItem}
        onLongPress={() => onLongPress(account)}
      />
    );
  };

  return (
    <Modal adjustToContentHeight modalRef={modalRef} {...props}>
      <Header center={<Text style={FontStyles.Subtitle2}>Accounts</Text>} />
      <View style={styles.content}>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator
              style={[
                styles.activityIndicator,
                { marginBottom: wallets.length * 30 },
              ]}
              color="white"
            />
          </View>
        )}
        {wallets?.map(renderAccountItem)}
        <Touchable onPress={onCreateAccount}>
          <Row align="center" style={styles.row}>
            <Icon name="plus" />
            <Text style={FontStyles.Normal}> Create account</Text>
          </Row>
        </Touchable>
        <CreateEditAccount
          modalRef={createEditAccountRef}
          accountsModalRef={modalRef}
          account={selectedAccount}
        />
      </View>
    </Modal>
  );
};

export default Accounts;
