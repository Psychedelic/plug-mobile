import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import { FontStyles } from '@/constants/theme';
import Icon from '@/icons';
import { capitalize } from '@/utils/strings.js';

import styles from './styles.js';

function BatchTransactions({ request, metadata }) {
  const appIcon = metadata.icons[0];

  const renderTransaction = ({ item: { methodName } }) => {
    // TODO: Change the subtitle value
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={FontStyles.Subtitle2}>{capitalize(methodName)}</Text>
          <Text style={[FontStyles.Small, styles.itemSubtitle]}>
            {`${capitalize(methodName)} Backend`}
          </Text>
        </View>
        <View style={styles.appIconContainer}>
          <Image source={{ uri: appIcon }} style={styles.appIcon} />
        </View>
      </View>
    );
  };

  const renderSeparator = () => (
    <View style={styles.separatorContainer}>
      <Icon name="arrowDownSecondary" />
    </View>
  );

  return (
    <FlatList
      bounces={false}
      data={request.args[1]}
      renderItem={renderTransaction}
      style={styles.flatListContainer}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
}

export default BatchTransactions;
