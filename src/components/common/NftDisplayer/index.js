import React, { useEffect, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import MaskedView from '@react-native-community/masked-view';
import { SquircleView } from 'react-native-figma-squircle';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import Image from 'react-native-remote-svg';
import styles from './styles';
import VideoNFTDisplay from './components/VideoNFTDisplay';

const NftDisplayer = ({ url, style }) => {
  const [type, setType] = useState('img');
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  useEffect(() => {
    fetch(url).then(response => {
      const content = response.headers.get('Content-Type');
      setType(content);
    });
  }, [url]);

  const hideSpinner = () => {
    setLoading(false);
  };

  if (type.includes('html')) {
    return (
      <View style={[styles.image, style]}>
        <WebView
          onLoad={hideSpinner}
          ref={webViewRef}
          source={{ uri: url }}
          style={{ flex: 1, ...styles.image }}
        />
        {loading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          />
        )}
      </View>
    );
  }

  if (type.includes('video')) {
    return (
      <VideoNFTDisplay
        url={url}
        hideSpinner={hideSpinner}
        style={styles.image}
        loading={loading}
      />
    );
  }
  return (
    <MaskedView
      style={[styles.image, style]}
      maskElement={
        <SquircleView
          style={StyleSheet.absoluteFill}
          squircleParams={{
            cornerRadius: 30,
            cornerSmoothing: 1,
          }}
        />
      }>
      <Image
        resizeMode="cover"
        style={{
          ...StyleSheet.absoluteFill,
          height: type.includes('svg') ? 500 : undefined,
          width: type.includes('svg') ? 550 : undefined,
        }}
        source={{ uri: url, type }}
      />
    </MaskedView>
  );
};

export default NftDisplayer;
