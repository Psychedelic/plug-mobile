import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Image from '@/components/common/Image';
import { Colors } from '@/constants/theme';

import sharedStyles from '../../styles';
import HTMLDisplayer from '../HTMLDisplayer';

interface Props {
  style: StyleProp<ViewStyle>;
  url: string;
  type?: string;
}

function ImageDisplayer({ style, type, url }: Props) {
  return (
    <MaskedView
      style={[sharedStyles.image, style]}
      maskElement={
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: 20,
              backgroundColor: Colors.Black.Pure,
            },
            style,
          ]}
        />
      }>
      {type?.includes('svg') || type?.includes('html') ? (
        <HTMLDisplayer
          url={url}
          style={{ width: '100%', height: '100%' }}
          type={type}
        />
      ) : (
        <Image
          resizeMode="contain"
          style={{ width: '100%', height: '100%' }}
          url={url}
        />
      )}
    </MaskedView>
  );
}

export default ImageDisplayer;
