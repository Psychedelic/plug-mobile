import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Image from '@/components/common/Image';

import styles from '../../styles';
import HTMLDisplayer from '../HTMLDisplayer';

interface Props {
  style: StyleProp<ViewStyle>;
  url: string;
  type?: string;
}

function ImageDisplayer({ style, type, url }: Props) {
  return (
    <MaskedView
      style={style}
      maskElement={
        <View style={[StyleSheet.absoluteFill, styles.imageMask, style]} />
      }>
      {type?.includes('svg') || type?.includes('html') ? (
        <HTMLDisplayer url={url} style={styles.fullsize} type={type} />
      ) : (
        <Image resizeMode="contain" style={styles.fullsize} url={url} />
      )}
    </MaskedView>
  );
}

export default ImageDisplayer;
