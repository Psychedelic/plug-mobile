import Clipboard from '@react-native-community/clipboard';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CommonItem from '@/commonComponents/CommonItem';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import ActionSheet from '@/components/common/ActionSheet';
import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import AddGray from '@/components/icons/svg/AddGray.svg';
import CheckedBlueCircle from '@/components/icons/svg/CheckedBlueCircle.svg';
import { FontStyles } from '@/constants/theme';
import CopyIcon from '@/icons/svg/material/Copy.svg';
import EditIcon from '@/icons/svg/material/Edit.svg';
import { Row } from '@/layout';
import { getICPPrice } from '@/redux/slices/icp';
import { setCurrentPrincipal } from '@/redux/slices/keyring';
import shortAddress from '@/utils/shortAddress';

import CreateEditAccount from '../CreateEditAccount';
import AddICNS from './AddICNS';
import styles from './styles';

const Accounts = ({ modalRef, onClose, ...props }) => {
  const { wallets, currentWallet } = useSelector(state => state.keyring);
  const { icpPrice } = useSelector(state => state.icp);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const actionSheetRef = useRef(null);
  const [actionSheetData, setActionSheetData] = useState(undefined);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const createEditAccountRef = useRef(null);
  const addICNSRef = useRef(null);

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
    dispatch(setCurrentPrincipal({ walletNumber, icpPrice }))
      .unwrap()
      .then(() => {
        setLoading(false);
        modalRef.current?.close();
      });
  };

  const onAddICNS = account => {
    setSelectedAccount(account);
    addICNSRef.current?.open();
  };

  const onLongPress = account => {
    const isSelectedAccount = currentWallet?.principal === account.principal;
    const options = [
      {
        id: 1,
        label: t('accounts.moreOptions.edit'),
        onPress: () => onEditAccount(account),
        icon: Platform.select({ android: EditIcon }),
      },
      {
        id: 2,
        label: t('accounts.moreOptions.copy'),
        onPress: () => Clipboard.setString(account.principal),
        icon: Platform.select({ android: CopyIcon }),
      },
    ];

    if (isSelectedAccount) {
      options.push({
        id: 3,
        label: t('accounts.moreOptions.icns'),
        onPress: () => onAddICNS(account),
        icon: Platform.select({ android: AddGray }),
      });
    }

    setActionSheetData({
      title: account.name,
      subtitle: shortAddress(account.principal),
      options,
    });
    actionSheetRef?.current?.open();
  };

  const handleOptionsClose = () => {
    setActionSheetData(undefined);
  };

  const renderAccountItem = (account, index) => {
    const isSelectedAccount = currentWallet?.principal === account.principal;
    const selectedAccountProps = {
      nameStyle: styles.selectedAccount,
      RightIcon: CheckedBlueCircle,
      rightIconProps: {
        viewBox: '-2 -2 16 16',
      },
    };

    const handleOnPress = () => {
      if (!isSelectedAccount) {
        onChangeAccount(account?.walletNumber);
      }
    };

    return (
      <CommonItem
        key={index}
        name={account?.icnsData.reverseResolvedName || account.name}
        image={account.icon}
        id={account.principal}
        onPress={handleOnPress}
        style={styles.accountItem}
        onLongPress={() => onLongPress(account)}
        {...(isSelectedAccount && selectedAccountProps)}
      />
    );
  };

  return (
    <>
      <Modal adjustToContentHeight modalRef={modalRef} {...props}>
        <Header center={<Text type="subtitle2">{t('accounts.title')}</Text>} />
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
              <Icon name="plus" style={styles.plusIcon} />
              <Text style={FontStyles.Normal}>
                {t('accounts.createAccount')}
              </Text>
            </Row>
          </Touchable>
          <CreateEditAccount
            modalRef={createEditAccountRef}
            accountsModalRef={modalRef}
            account={selectedAccount}
          />
        </View>
      </Modal>
      <ActionSheet
        modalRef={actionSheetRef}
        onClose={handleOptionsClose}
        title={actionSheetData?.title}
        subtitle={actionSheetData?.subtitle}
        options={actionSheetData?.options}
      />
      <AddICNS modalRef={addICNSRef} />
    </>
  );
};

export default Accounts;
