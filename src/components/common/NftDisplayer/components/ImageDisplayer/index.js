import MaskedView from '@react-native-community/masked-view';
import { SquircleView } from 'react-native-figma-squircle';
import { SvgCssUri } from 'react-native-svg';
import Image from 'react-native-remote-svg';
import { StyleSheet } from 'react-native';
import React from 'react';

import sharedStyles from '../../styles';

function ImageDisplayer({ style, type, url }) {
  return (
    <MaskedView
      style={[sharedStyles.image, style]}
      maskElement={
        <SquircleView
          style={StyleSheet.absoluteFill}
          squircleParams={{
            cornerRadius: 20,
            cornerSmoothing: 1,
          }}
        />
      }>
      {type?.includes('svg') ? (
        <SvgCssUri width="100%" height="100%" uri={url} />
      ) : (
        <Image
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          source={{ uri: url, type }}
        />
      )}
    </MaskedView>
  );
}

export default ImageDisplayer;
