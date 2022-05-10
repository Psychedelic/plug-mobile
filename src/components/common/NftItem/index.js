import React from 'react';
import { Text, View } from 'react-native';

import NftDisplayer from '@/commonComponents/NftDisplayer';

import styles from './styles';

const NftItem = ({ url, name, style }) => (
  <View style={[styles.root, style]}>
    <NftDisplayer url={url} style={styles.nftDisplayer} />
    <View style={styles.leftContainer}>
      <Text style={styles.nftName}>{name}</Text>
    </View>
  </View>
);

export default NftItem;
