import Clipboard from '@react-native-community/clipboard';
import { t } from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';

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
import CopyIcon from '@/icons/material/Copy.svg';
import EditIcon from '@/icons/material/Edit.svg';
import { Row } from '@/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getICPPrice } from '@/redux/slices/icp';
import { setCurrentPrincipal } from '@/redux/slices/keyring';
import shortAddress from '@/utils/shortAddress';

import CreateEditAccount from '../CreateEditAccount';
import CreateImportAccount from '../CreateImportAccount';
import AddICNS from './AddICNS';
import styles from './styles';

/**
 * @param {{modalRef: any, onClose?: () => void}} param
 */
const Accounts = ({ modalRef, onClose, ...props }) => {
  const { wallets, currentWallet } = useAppSelector(state => state.keyring);
  const { icpPrice } = useAppSelector(state => state.icp);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const hasICNS = !!currentWallet?.icnsData.reverseResolvedName;
  const actionSheetRef = useRef(null);
  const [actionSheetData, setActionSheetData] = useState(undefined);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const createEditAccountRef = useRef(null);
  const createImportAccountRef = useRef(null);
  const addICNSRef = useRef(null);

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const onCreateImportAccount = () => {
    setSelectedAccount(null);
    createImportAccountRef.current?.open();
  };

  const onEditAccount = account => {
    setSelectedAccount(account);
    createEditAccountRef.current?.open();
  };

  const onChangeAccount = walletId => {
    setLoading(true);
    dispatch(setCurrentPrincipal({ walletId, icpPrice }))
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
        label: hasICNS
          ? t('accounts.moreOptions.changeIcns')
          : t('accounts.moreOptions.addIcns'),
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
      right: <CheckedBlueCircle viewBox="-2 -2 16 16" />,
    };

    const handleOnPress = () => {
      if (!isSelectedAccount) {
        onChangeAccount(account?.walletId);
      }
    };

    return (
      <CommonItem
        key={index}
        name={account?.icnsData.reverseResolvedName || account.name}
        icon={account.icon}
        id={account.principal}
        onPress={handleOnPress}
        style={styles.accountItem}
        onLongPress={() => onLongPress(account)}
        onActionPress={() => onLongPress(account)}
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
          <Touchable onPress={onCreateImportAccount}>
            <Row align="center" style={styles.row}>
              <Icon name="plus" style={styles.plusIcon} />
              <Text style={FontStyles.Normal}>
                {t('accounts.createImportAccount')}
              </Text>
            </Row>
          </Touchable>
          <CreateEditAccount
            modalRef={createEditAccountRef}
            accountsModalRef={modalRef}
            account={selectedAccount}
          />
          <CreateImportAccount
            modalRef={createImportAccountRef}
            accountsModalRef={modalRef}
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
