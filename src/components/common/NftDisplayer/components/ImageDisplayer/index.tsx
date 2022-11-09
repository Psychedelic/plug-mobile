import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import Image from '@/components/common/Image';
import { Colors } from '@/constants/theme';
import { FileTypes } from '@/interfaces/general';

import sharedStyles from '../../styles';
import HTMLDisplayer from '../HTMLDisplayer';

interface Props {
  style: StyleProp<ViewStyle>;
  url: string;
  type?: FileTypes;
}

function ImageDisplayer({ style, type, url }: Props) {
  // const innerStyle = isSendView
  //   ? { width: 54, height: 54 }
  //   : { width: '100%', height: '100%' };

  return (
    <MaskedView
      style={[sharedStyles.image, style]}
      maskElement={
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              // borderRadius: isSendView ? 10 : 20,
              borderRadius: 20,
              backgroundColor: Colors.Black.Pure,
            },
            style,
          ]}
        />
      }>
      {type === 'svg' || type === 'html' ? (
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
