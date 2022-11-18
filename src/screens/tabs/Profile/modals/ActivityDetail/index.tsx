import Clipboard from '@react-native-clipboard/clipboard';
import { t } from 'i18next';
import React, { RefObject } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import { Header, Modal, Text, Touchable } from '@/components/common';
import useCustomToast from '@/hooks/useCustomToast';
import { Contact, Transaction } from '@/interfaces/redux';
import { useAppSelector } from '@/redux/hooks';
import ActivityItem from '@/screens/tabs/components/ActivityItem';
import { isOwnAddress, validateICNSName } from '@/utils/ids';
import shortAddress from '@/utils/shortAddress';
import { capitalize } from '@/utils/strings';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  activity: Transaction;
  onClosed: () => void;
}

interface RowProps {
  title: string;
  value: string;
  onPress?: (address: string) => void;
  showSelf?: boolean;
  hideRow?: boolean;
  contact?: Contact;
}

const formatAddress = (address: string) =>
  validateICNSName(address)
    ? address
    : shortAddress(address, {
        leftSize: 5,
        rightSize: 9,
        separator: '...',
        replace: [],
      });

function ActivityDetail({ modalRef, activity, onClosed }: Props) {
  const { currentWallet } = useAppSelector(state => state.keyring);
  const { contacts } = useAppSelector(state => state.user);
  const { showInfo } = useCustomToast();

  const handleOnCopy = (address: string) => () => {
    Clipboard.setString(address);
    showInfo(t('activity.details.copied'));
  };

  const ROWS =
    activity && currentWallet
      ? [
          {
            title: t('activity.details.trxType'),
            value: capitalize(activity.type?.toLocaleLowerCase()),
          },
          {
            title: t('activity.details.from'),
            value: formatAddress(activity.from),
            onPress: handleOnCopy(activity.from),
            showSelf: isOwnAddress(activity.from, currentWallet),
            hideRow: activity.type === 'MINT',
            contact: contacts.find(c => c.id === activity.from),
          },
          {
            title: t('activity.details.to'),
            value: formatAddress(activity.to),
            onPress: handleOnCopy(activity.to),
            showSelf: isOwnAddress(activity.to, currentWallet),
            contact: contacts.find(c => c.id === activity.to),
          },
        ]
      : [];

  const renderRow = (
    { onPress, hideRow, title, value, showSelf, contact }: RowProps,
    index: number
  ) => {
    const isTouchable = !!onPress;

    return !hideRow ? (
      <View key={index} style={styles.row}>
        <Text type="caption" style={styles.rowTitle}>
          {title}
        </Text>
        <Touchable onPress={onPress} disabled={!isTouchable}>
          <Text
            type="caption"
            style={[styles.rowValue, isTouchable && styles.link]}>
            {value}
            {(showSelf || !!contact) && (
              <Text type="caption" style={styles.rowTitle}>
                {showSelf ? t('activity.details.you') : ` (${contact?.name})`}
              </Text>
            )}
          </Text>
        </Touchable>
      </View>
    ) : null;
  };

  return (
    <Modal
      adjustToContentHeight
      modalRef={modalRef}
      onClosed={onClosed}
      HeaderComponent={
        <Header
          center={<Text type="subtitle2">{t('activity.details.title')}</Text>}
        />
      }>
      <View style={styles.container}>
        <ActivityItem {...activity} style={styles.activityItem} />
        {ROWS.map(renderRow)}
      </View>
    </Modal>
  );
}

export default ActivityDetail;
