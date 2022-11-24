import Clipboard from '@react-native-clipboard/clipboard';
import { t } from 'i18next';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Platform, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  AccountShowcase,
  ActionSheet,
  Header,
  Modal,
  Text,
  Touchable,
} from '@/components/common';
import Icon from '@/components/icons';
import { COMMON_HITSLOP } from '@/constants/general';
import { FontStyles } from '@/constants/theme';
import CopyIcon from '@/icons/material/Copy.svg';
import EditIcon from '@/icons/material/Edit.svg';
import TrashCan from '@/icons/material/TrashCan.svg';
import AddGray from '@/icons/svg/AddGray.svg';
import CheckedBlueCircle from '@/icons/svg/CheckedBlueCircle.svg';
import { Wallet } from '@/interfaces/redux';
import { Row } from '@/layout';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getICPPrice } from '@/redux/slices/icp';
import { removeAccount, setCurrentPrincipal } from '@/redux/slices/keyring';
import animationScales from '@/utils/animationScales';
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
  const [actionSheetData, setActionSheetData] = useState<any>();
  const [selectedAccount, setSelectedAccount] = useState<Wallet>();

  const addICNSRef = useRef<Modalize>(null);
  const actionSheetRef = useRef<Modalize>(null);
  const createEditAccountRef = useRef<Modalize>(null);
  const createImportAccountRef = useRef<Modalize>(null);

  const hasICNS = !!currentWallet?.icnsData?.reverseResolvedName;

  useEffect(() => {
    dispatch(getICPPrice());
  }, []);

  const onCreateImportAccount = () => {
    setSelectedAccount(undefined);
    createImportAccountRef.current?.open();
  };

  const onEditAccount = (account: Wallet) => {
    setSelectedAccount(account);
    createEditAccountRef.current?.open();
  };

  const onRemoveAccount = (account: Wallet) => {
    const accountName = account?.icnsData?.reverseResolvedName || account.name;
    Alert.alert(
      t('accounts.moreOptions.removeAccount'),
      t('accounts.removeAccountMessage', { accountName }),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('accounts.moreOptions.removeAccount'),
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
      })
      .catch(() => {});
  };

  const onAddICNS = (account: Wallet) => {
    setSelectedAccount(account);
    addICNSRef.current?.open();
  };

  const openAccountOptions = (account: Wallet) => {
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
        id: options.length + 1,
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
    const isSelectedAccount =
      currentWallet?.principal === account.principal &&
      currentWallet?.type === account.type;

    const handleOpenAccountOptions = () => openAccountOptions(account);

    const selectedAccountProps = {
      selected: true,
      titleStyle: styles.selectedAccount,
      titleRight: <CheckedBlueCircle style={styles.checkbox} />,
    };

    const handleOnPress = () => {
      if (!isSelectedAccount) {
        onChangeAccount(account?.walletId);
      }
    };

    return (
      <AccountShowcase
        key={index}
        icon={account.icon}
        onPress={handleOnPress}
        selected={isSelectedAccount}
        onLongPress={handleOpenAccountOptions}
        subtitle={shortAddress(account.principal)}
        title={account?.icnsData?.reverseResolvedName || account.name}
        right={
          <View style={styles.threeDots}>
            <Touchable
              onPress={handleOpenAccountOptions}
              scale={animationScales.large}
              hitSlop={COMMON_HITSLOP}>
              <Icon name="threeDots" />
            </Touchable>
          </View>
        }
        {...(isSelectedAccount && selectedAccountProps)}
      />
    );
  };

  const resetState = () => {
    setSelectedAccount(undefined);
    setActionSheetData(undefined);
  };

  return (
    <>
      <Modal
        adjustToContentHeight
        modalRef={modalRef}
        onClosed={resetState}
        HeaderComponent={
          <Header
            center={<Text type="subtitle2">{t('accounts.title')}</Text>}
          />
        }>
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
            account={selectedAccount!}
          />
          <CreateImportAccount modalRef={createImportAccountRef} />
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
