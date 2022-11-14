import React from 'react';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { CommonItem } from '@/components/common';
import { icScanUrl } from '@/constants/urls';
import { ModalScreenProps } from '@/interfaces/navigation';
import { WCWhiteListItem } from '@/interfaces/walletConnect';
import Routes from '@/navigation/Routes';
import { formatLongDate } from '@/utils/dates';

import styles from './styles';

function ApprovedCanisters({
  route,
}: ModalScreenProps<Routes.APPROVED_CANISTERS>) {
  const { name, canisterList, imageUri, lastConnection } =
    route.params.app || {};

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
        onActionPress={redirectToCanister}
        actionIconName="redirectArrow"
        key={`${canisterId}: ${index}`}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <CommonItem
        name={name}
        imageUri={imageUri}
        showActions={false}
        style={styles.itemShowcase}
        subtitle={`${formatLongDate(lastConnection)}`}
      />
      {canisterList?.map(renderCanister)}
    </ScrollView>
  );
}

export default ApprovedCanisters;
