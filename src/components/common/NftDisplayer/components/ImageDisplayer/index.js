import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Image from '@/components/common/Image';
import { Colors } from '@/constants/theme';

import HTMLDisplayer from '../../components/HTMLDisplayer';
import sharedStyles from '../../styles';

function ImageDisplayer({ style, type, url, isSendView, isDetailView }) {
  const innerStyle = isSendView
    ? { width: 54, height: 54 }
    : { width: '100%', height: '100%' };

  return (
    <MaskedView
      style={[sharedStyles.image, style]}
      maskElement={
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: isSendView ? 10 : 20,
              backgroundColor: Colors.Black.Pure,
            },
          ]}
        />
      }>
      {type?.includes('svg') || type?.includes('html') ? (
        <HTMLDisplayer
          url={url}
          style={innerStyle}
          isSendView
          type={type}
          isDetailView={isDetailView}
        />
      ) : (
        <Image resizeMode="contain" style={innerStyle} url={url} />
      )}
    </MaskedView>
  );
}

export default ImageDisplayer;
