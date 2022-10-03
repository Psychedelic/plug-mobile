import React, { useState } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

import styles from './styles';

interface Props {
  url?: string;
  style?: StyleProp<ImageStyle>;
  loaderStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

function Image({ url, style, children, resizeMode, loaderStyle }: Props) {
  const [isLoading, setLoading] = useState(false);
  return (
    <FastImage
      source={{ uri: url }}
      style={[styles.container, style]}
      resizeMode={resizeMode}
      onLoadStart={() => setLoading(true)}
      onLoadEnd={() => setLoading(false)}>
      {isLoading ? (
        <ActivityIndicator
          style={[styles.loader, loaderStyle]}
          size="small"
          color="white"
          animating={isLoading}
        />
      ) : (
        children
      )}
    </FastImage>
  );
}

export default Image;
