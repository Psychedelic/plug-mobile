import Clipboard from '@react-native-community/clipboard';
import { t } from 'i18next';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import CommonItem from '@/commonComponents/CommonItem';
import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import Touchable from '@/commonComponents/Touchable';
import ActionSheet from '@/components/common/ActionSheet';
import Text from '@/components/common/Text';
import Icon from '@/components/icons';
import AddGray from '@/components/icons/svg/AddGray.svg';
import CheckedBlueCircle from '@/components/icons/svg/CheckedBlueCircle.svg';
import TrashCan from '@/components/icons/svg/material/TrashCan.svg';
import { FontStyles } from '@/constants/theme';
import CopyIcon from '@/icons/svg/material/Copy.svg';
import EditIcon from '@/icons/svg/material/Edit.svg';
import { Nullable } from '@/interfaces/general';
import { Wallet } from '@/interfaces/redux';
import { Row } from '@/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getICPPrice } from '@/redux/slices/icp';
import { removeAccount, setCurrentPrincipal } from '@/redux/slices/keyring';
import shortAddress from '@/utils/shortAddress';

import CreateEditAccount from '../CreateEditAccount';
import CreateImportAccount from '../CreateImportAccount';
import AddICNS from './AddICNS';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
}

function Accounts({ modalRef }: Props) {
  const { wallets, currentWallet } = useAppSelector(state => state.keyring);
  const { icpPrice } = useAppSelector(state => state.icp);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [actionSheetData, setActionSheetData] = useState<any>(undefined);
  const [selectedAccount, setSelectedAccount] =
    useState<Nullable<Wallet>>(null);

  const addICNSRef = useRef<Modalize>(null);
  const actionSheetRef = useRef<Modalize>(null);
  const createEditAccountRef = useRef<Modalize>(null);
  const createImportAccountRef = useRef<Modalize>(null);

  const hasICNS = !!currentWallet?.icnsData?.reverseResolvedName;

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const onCreateImportAccount = () => {
    setSelectedAccount(null);
    createImportAccountRef.current?.open();
  };

  const onEditAccount = (account: Wallet) => {
    setSelectedAccount(account);
    createEditAccountRef.current?.open();
  };

  const onRemoveAccount = (account: Wallet) => {
    const accountName = account?.icnsData?.reverseResolvedName || account.name;
    Alert.alert(
      'Remove Account',
      `Are you sure you want to remove ${accountName} from your account list? \nYou can always add the wallet back by importing it again.`,
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('tokensTab.deleteAction'),
          style: 'destructive',
          onPress: () => {
            dispatch(removeAccount(account));
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onChangeAccount = (walletId: string) => {
    setLoading(true);
    dispatch(setCurrentPrincipal({ walletId, icpPrice }))
      .unwrap()
      .then(() => {
        setLoading(false);
        modalRef.current?.close();
      });
  };

  const onAddICNS = (account: Wallet) => {
    setSelectedAccount(account);
    addICNSRef.current?.open();
  };

  const onLongPress = (account: Wallet) => {
    const isSelectedAccount = currentWallet?.principal === account.principal;
    const isImportedAccount = !account.type.includes('MNEMONIC');

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

    if (isImportedAccount) {
      options.push({
        id: isSelectedAccount ? 4 : 3,
        label: t('accounts.moreOptions.removeAccount'),
        onPress: () => onRemoveAccount(account),
        icon: Platform.select({ android: TrashCan }),
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

  const renderAccountItem = (account: Wallet, index: number) => {
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
        name={account?.icnsData?.reverseResolvedName || account.name}
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
      <Modal adjustToContentHeight modalRef={modalRef}>
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
            account={selectedAccount!}
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
}

export default Accounts;
