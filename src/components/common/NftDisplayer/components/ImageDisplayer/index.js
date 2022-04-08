import MaskedView from '@react-native-masked-view/masked-view';
import { SquircleView } from 'react-native-figma-squircle';
import Image from 'react-native-remote-svg';
import { StyleSheet } from 'react-native';
import React from 'react';

import HTMLDisplayer from '../../components/HTMLDisplayer';
import sharedStyles from '../../styles';

function ImageDisplayer({ style, type, url, isSendView, isDetailView }) {
  const imageStyle = isSendView
    ? { width: 54, height: 54 }
    : { width: '100%', height: '100%' };

  return (
    <MaskedView
      style={[sharedStyles.image, style]}
      maskElement={
        <SquircleView
          style={StyleSheet.absoluteFill}
          squircleParams={{
            cornerRadius: isSendView ? 10 : 20,
            cornerSmoothing: 1,
          }}
        />
      }>
      {type?.includes('svg') || type?.includes('html') ? (
        <HTMLDisplayer
          url={url}
          style={style}
          isSendView
          type={type}
          isDetailView={isDetailView}
        />
      ) : (
        <Image
          resizeMode="contain"
          style={imageStyle}
          source={{ uri: url, type }}
        />
      )}
    </MaskedView>
  );
}

export default ImageDisplayer;
