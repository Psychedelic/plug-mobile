import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React, { RefObject, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  ActionSheet,
  CommonItem,
  Header,
  Modal,
  Text,
} from '@/components/common';
import DeleteIcon from '@/icons/material/Delete.svg';
import ViewIcon from '@/icons/material/View.svg';
import { ConnectedApp } from '@/interfaces/redux';
import Routes from '@/navigation/Routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeConnectedApp } from '@/redux/slices/user';
import { formatLongDate } from '@/utils/dates';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
}

function ConnectedApps({ modalRef }: Props) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const principalId = useAppSelector(
    state => state?.keyring?.currentWallet?.principal
  );
  const connectedApps = useAppSelector(
    state => state.user.connectedApps
  )?.filter(app => app.account === principalId);

  const [actionSheetData, setActionSheetData] = useState<any>();
  const actionSheetRef = useRef<Modalize>(null);

  const openDetailView = (app: ConnectedApp) => {
    modalRef.current?.close();
    navigation.navigate(Routes.APPROVED_CANISTERS, { app });
  };

  const removeConnection = ({ name, account }: ConnectedApp) => {
    dispatch(removeConnectedApp({ name, account }));
  };

  const showActionData = (connectedApp: ConnectedApp) => {
    const newActionsData = {
      options: [
        {
          id: 1,
          label: t('connectedApps.viewDetail'),
          onPress: () => openDetailView(connectedApp),
          icon: Platform.select({ android: ViewIcon }),
        },
        {
          id: 2,
          label: t('connectedApps.deleteConnection'),
          onPress: () => removeConnection(connectedApp),
          icon: Platform.select({ android: DeleteIcon }),
        },
      ],
    };
    setActionSheetData(newActionsData);
    actionSheetRef?.current?.open();
  };

  const renderApp = (item: ConnectedApp, index: number) => {
    const { name, lastConnection, imageUri } = item;
    const openApp = (app: ConnectedApp) => () => {
      showActionData(app);
    };

    return (
      <CommonItem
        name={name}
        imageUri={imageUri}
        image="unknown"
        style={styles.appItem}
        onPress={openApp(item)}
        onActionPress={openApp(item)}
        key={`${name}-${index}`}
        subtitle={`${formatLongDate(lastConnection)}`}
      />
    );
  };

  return (
    <>
      <Modal
        modalRef={modalRef}
        adjustToContentHeight
        disableScrollIfPossible={false}
        HeaderComponent={
          <Header
            center={
              <Text type="subtitle2">
                {t('settings.items.connectedApps.name')}
              </Text>
            }
          />
        }>
        <View style={styles.container}>
          {connectedApps.length > 0 ? (
            connectedApps.map(renderApp)
          ) : (
            <Text style={styles.emptyState}>
              {t('connectedApps.emptyState')}
            </Text>
          )}
        </View>
      </Modal>
      <ActionSheet
        modalRef={actionSheetRef}
        options={actionSheetData?.options}
      />
    </>
  );
}

export default ConnectedApps;
