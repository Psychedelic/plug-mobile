import { t } from 'i18next';
import React, { RefObject } from 'react';
import { Linking, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  ActionButton,
  CommonItem,
  Header,
  Modal,
  Text,
} from '@/components/common';
import { icScanUrl } from '@/constants/urls';
import { ConnectedApp } from '@/interfaces/redux';
import { WCWhiteListItem } from '@/interfaces/walletConnect';
import { formatLongDate } from '@/utils/dates';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  connectedAppsRef: RefObject<Modalize>;
  app: ConnectedApp;
}

function ApprovedCanisters({ modalRef, app, connectedAppsRef }: Props) {
  const { name, canisterList, imageUri, lastConection } = app || {};

  const renderCanister = (item: WCWhiteListItem, index: number) => {
    const { canisterId, icon } = item;

    const redirectToCanister = () =>
      Linking.openURL(`${icScanUrl}${canisterId}`);

    return (
      <CommonItem
        longId
        id={canisterId}
        name={item.name}
        imageUri={icon}
        image="unknown"
        style={styles.canister}
        onPress={redirectToCanister}
        actionIconName="redirectArrow"
        key={`${canisterId}: ${index}`}
      />
    );
  };

  const closeModal = () => {
    handleBack();
    connectedAppsRef?.current?.close();
  };

  const handleBack = () => {
    modalRef?.current?.close();
  };

  return (
    <>
      <Modal
        modalRef={modalRef}
        adjustToContentHeight
        disableScrollIfPossible={false}
        HeaderComponent={
          <Header
            right={
              <ActionButton onPress={closeModal} label={t('common.close')} />
            }
            left={
              <ActionButton onPress={handleBack} label={t('common.back')} />
            }
            center={
              <Text type="subtitle2">
                {t('connectedApps.approvedCanisters')}
              </Text>
            }
          />
        }>
        <View style={styles.container}>
          <CommonItem
            name={name}
            imageUri={imageUri}
            showActions={false}
            style={styles.itemShowcase}
            subtitle={`${formatLongDate(lastConection)}`}
          />
          {canisterList?.map(renderCanister)}
        </View>
      </Modal>
    </>
  );
}

export default ApprovedCanisters;
