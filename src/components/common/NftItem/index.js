import React from 'react';
import { View, Text } from 'react-native';
import { FontStyles } from '../../../constants/theme';
import NftDisplayer from '../NftDisplayer';
import styles from './styles';

const NftItem = ({ url, name, style }) => (
  <View style={[styles.root, style]}>
    <NftDisplayer
      url={url}
      style={{ height: 155, aspectRatio: 1, borderRadius: 7 }}
    />
    <View style={styles.leftContainer}>
      <Text style={styles.nftName}>{name}</Text>
    </View>
  </View>
);

export default NftItem;
