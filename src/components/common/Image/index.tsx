import React, { useState } from 'react';
import { ActivityIndicator, StyleProp } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

import styles from './styles';

interface Props {
  url?: string;
  style?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

function Image({ url, style, children, resizeMode }: Props) {
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
          style={styles.loader}
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
