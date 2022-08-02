import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import CachedImage from '@/components/common/Image';
import { FontStyles } from '@/constants/theme';
import { WallectConnectFlowsData } from '@/interfaces/walletConnect';
import { capitalize } from '@/utils/strings';

import ArrowIcon from '../../assets/ArrowDown.png';
import styles from './styles';

function BatchTransactions({ request, metadata }: WallectConnectFlowsData) {
  const appIcon = metadata.icons[0];
  const transactions = request.args[1];

  const renderTransaction = (
    { methodName }: { methodName: string },
    index: number
  ) => {
    const showSeparator = index !== transactions.length - 1;
    // TODO: Change the subtitle value
    return (
      <View key={`${methodName}${index}`} style={styles.item}>
        <View style={styles.itemDataContainer}>
          <View>
            <Text style={FontStyles.Subtitle2}>{capitalize(methodName)}</Text>
            <Text style={[FontStyles.Small, styles.itemSubtitle]}>
              {`${capitalize(methodName)} Backend`}
            </Text>
          </View>
          <View style={styles.appIconContainer}>
            <CachedImage url={appIcon} style={styles.appIcon} />
          </View>
        </View>
        {showSeparator && (
          <View style={styles.separatorContainer}>
            <Image source={ArrowIcon} />
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      bounces={false}
      style={styles.list}
      overScrollMode="never"
      contentContainerStyle={styles.listContentContainer}>
      {transactions.map(renderTransaction)}
    </ScrollView>
  );
}

export default BatchTransactions;
