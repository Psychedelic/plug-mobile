import { ActionSheetIOS, ActivityIndicator, View, Text } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useDispatch, useSelector } from 'react-redux';
import React, { useRef, useState } from 'react';

import { reset, setCurrentPrincipal } from '../../redux/slices/keyring';
import CreateEditAccount from '../../modals/CreateEditAccount';
import Touchable from '../../components/animations/Touchable';
import AccountItem from '../../components/common/AccountItem';
import shortAddress from '../../helpers/short-address';
import { useICPPrice } from '../../redux/slices/icp';
import Header from '../../components/common/Header';
import { FontStyles } from '../../constants/theme';
import { getNFTs } from '../../redux/slices/user';
import Row from '../../components/layout/Row';
import Modal from '../../components/modal';
import Icon from '../../components/icons';
import styles from './styles';

const Accounts = ({ modalRef, onClose, ...props }) => {
  const { wallets, currentWallet } = useSelector(state => state.keyring);
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
      if (currentWallet.principal !== account.principal) {
        onChangeAccount(account?.walletNumber);
      }
    };

    return (
      <AccountItem
        key={index}
        account={account}
        onPress={handleOnPress}
        onMenu={() => onLongPress(account)}
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
          account={selectedAccount}
        />
      </View>
    </Modal>
  );
};

export default Accounts;
