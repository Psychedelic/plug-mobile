import { t } from 'i18next';
import React, { RefObject, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch, useSelector } from 'react-redux';

import { ActionSheet, Header, Modal, Text } from '@/components/common';
import CommonItem, { getShowcaseImage } from '@/components/common/CommonItem';
import DeleteIcon from '@/icons/svg/material/Delete.svg';
import ViewIcon from '@/icons/svg/material/View.svg';
import { ConnectedApp, State } from '@/interfaces/redux';
import { removeConnectedApp } from '@/redux/slices/user';
import { formatLongDate } from '@/utils/dates';

import ApprovedCanisters from './components/ApprovedCanisters';
import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
}

function ConnectedApps({ modalRef }: Props) {
  const dispatch = useDispatch();
  const connectedApps = useSelector((state: State) => state.user.connectedApps);
  const [selectedApp, setSelectedApp] = useState<ConnectedApp>();
  const [actionSheetData, setActionSheetData] = useState<any>();
  const actionSheetRef = useRef<Modalize>(null);
  const approvedcanistersRef = useRef<Modalize>(null);

  const openDetailView = (app: ConnectedApp) => {
    setSelectedApp(app);
    approvedcanistersRef.current?.open();
  };

  const removeConnection = (app: ConnectedApp) => {
    dispatch(removeConnectedApp(app.name));
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
    const { name, lastConection, imageUri } = item;
    const openApp = (app: ConnectedApp) => () => {
      showActionData(app);
    };

    return (
      <CommonItem
        name={name}
        {...getShowcaseImage(imageUri)}
        style={styles.appItem}
        onPress={openApp(item)}
        key={`${name}-${index}`}
        subtitle={`${formatLongDate(lastConection)}`}
      />
    );
  };

  return (
    <>
      <Modal
        modalRef={modalRef}
        adjustToContentHeight
        disableScrollIfPossible={false}
        modalStyle={styles.modalStyle}
        HeaderComponent={
          <Header
            center={
              <Text type="subtitle2">
                {t('settings.items.connectedApps.name')}
              </Text>
            }
          />
        }>
        {connectedApps.length > 0 ? (
          connectedApps.map(renderApp)
        ) : (
          <Text style={styles.emptyState}>{t('connectedApps.emptyState')}</Text>
        )}
      </Modal>
      <ActionSheet
        modalRef={actionSheetRef}
        options={actionSheetData?.options}
      />
      <ApprovedCanisters
        app={selectedApp!}
        connectedAppsRef={modalRef}
        modalRef={approvedcanistersRef}
      />
    </>
  );
}

export default ConnectedApps;
