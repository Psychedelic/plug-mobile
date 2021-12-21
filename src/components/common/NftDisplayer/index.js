import { StyleSheet, ActivityIndicator, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import React, { useEffect, useState, useRef } from 'react';
import { SquircleView } from 'react-native-figma-squircle';
import { WebView } from 'react-native-webview';
import { SvgCssUri } from 'react-native-svg';
import Image from 'react-native-remote-svg';

import useFileDownload from '../../../hooks/useFileDownload';
import VideoNFTDisplay from './components/VideoNFTDisplay';
import styles from './styles';

const NftDisplayer = ({ url, style }) => {
  const [type, setType] = useState('img');
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);
  const newUrl = useFileDownload(url);

  useEffect(() => {
    fetch(url).then(response => {
      const content = response.headers.get('Content-Type');
      setType(content);
    });
  }, [url]);

  const hideSpinner = () => {
    setLoading(false);
  };

  const htmlBody = (
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

  const videoBody = (
    <VideoNFTDisplay
      url={newUrl}
      hideSpinner={hideSpinner}
      style={styles.image}
      loading={loading}
    />
  );

  return type?.includes('video') ? (
    videoBody
  ) : type?.includes('html') ? (
    htmlBody
  ) : (
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
};

export default NftDisplayer;
