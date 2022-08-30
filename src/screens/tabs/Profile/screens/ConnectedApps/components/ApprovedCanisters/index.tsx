import { t } from 'i18next';
import React, { RefObject } from 'react';
import { Linking } from 'react-native';
import { Modalize } from 'react-native-modalize';

import Header from '@/commonComponents/Header';
import Modal from '@/commonComponents/Modal';
import CommonItem from '@/components/common/CommonItem';
import Text from '@/components/common/Text';
import { FontStyles } from '@/constants/theme';
import { ConnectedApp } from '@/interfaces/redux';
import { WCWhiteListItem } from '@/interfaces/walletConnect';
import { formatLongDate } from '@/utils/dates';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  connectedAppsRef: RefObject<Modalize>;
  app?: ConnectedApp;
}

function ApprovedCanisters({ modalRef, app, connectedAppsRef }: Props) {
  const { name, canisterList, imageUri, lastConection } = app || {};

  const renderCanister = (item: WCWhiteListItem, index: number) => {
    const { canisterId, icon } = item;

    const redirectToCanister = () =>
      Linking.openURL(`https://icscan.io/canister/${canisterId}`);

    return (
      <CommonItem
        longId
        imageUri={icon}
        id={canisterId}
        name={item.name}
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
        modalStyle={styles.modalStyle}>
        <Header
          right={
            <Text
              style={[FontStyles.Normal, styles.valid]}
              onPress={closeModal}>
              {t('common.close')}
            </Text>
          }
          left={
            <Text
              style={[FontStyles.Normal, styles.valid]}
              onPress={handleBack}>
              {t('common.back')}
            </Text>
          }
          center={
            <Text type="subtitle2">{t('connectedApps.approvedCanisters')}</Text>
          }
        />
        <CommonItem
          name={name}
          imageUri={imageUri}
          showActions={false}
          style={styles.itemShowcase}
          subtitle={`${formatLongDate(lastConection)}`}
        />
        {canisterList?.map(renderCanister)}
      </Modal>
    </>
  );
}

export default ApprovedCanisters;
