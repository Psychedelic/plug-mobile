import Clipboard from '@react-native-clipboard/clipboard';
import { t } from 'i18next';
import React, { RefObject } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  ActionButton,
  Header,
  Modal,
  Text,
  Touchable,
} from '@/components/common';
import { Transaction, Wallet } from '@/interfaces/redux';
import { useAppSelector } from '@/redux/hooks';
import ActivityItem from '@/screens/tabs/components/ActivityItem';
import { validateICNSName } from '@/utils/ids';
import shortAddress from '@/utils/shortAddress';
import { capitalize } from '@/utils/strings';

import styles from './styles';

interface Props {
  modalRef: RefObject<Modalize>;
  activity: Transaction;
}

interface RowProps {
  title: string;
  value: string;
  onPress?: (address: string) => void;
  showSelf?: boolean;
  hideRow?: boolean;
}

const formatAddress = (address: string) =>
  validateICNSName(address) ? address : shortAddress(address);

const isMySelf = (address: string, currentWallet: Wallet) =>
  validateICNSName(address)
    ? address === currentWallet.icnsData?.reverseResolvedName
    : address === currentWallet.principal ||
      address === currentWallet.accountId;

function ActivityDetail({ modalRef, activity }: Props) {
  const { currentWallet } = useAppSelector(state => state.keyring);

  const closeModal = () => modalRef?.current?.close();
  const copyAddress = (address: string) => () => Clipboard.setString(address);

  const ROWS = activity
    ? [
        {
          title: t('activity.details.trxType'),
          value: capitalize(activity?.type?.toLocaleLowerCase()),
        },
        {
          title: t('activity.details.from'),
          value: formatAddress(activity?.from),
          onPress: copyAddress(activity?.from),
          showSelf: isMySelf(activity?.from, currentWallet!),
          hideRow: activity.type === 'MINT',
        },
        {
          title: t('activity.details.to'),
          value: formatAddress(activity?.to),
          onPress: copyAddress(activity?.to),
          showSelf: isMySelf(activity?.to, currentWallet!),
        },
      ]
    : [];

  const renderRow = (
    { onPress, hideRow, title, value, showSelf }: RowProps,
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
            {showSelf && (
              <Text type="caption" style={styles.rowTitle}>
                {t('activity.details.you')}
              </Text>
            )}
          </Text>
        </Touchable>
      </View>
    ) : null;
  };

  return (
    <Modal adjustToContentHeight modalRef={modalRef}>
      <Header
        right={<ActionButton onPress={closeModal} label={t('common.close')} />}
        center={<Text type="subtitle2">{t('activity.details.title')}</Text>}
      />
      <View style={styles.container}>
        <ActivityItem {...activity} onlyDate style={styles.activityItem} />
        {ROWS.map(renderRow)}
      </View>
    </Modal>
  );
}

export default ActivityDetail;
