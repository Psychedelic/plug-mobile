import { StyleSheet, ActivityIndicator, View } from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import { SquircleView } from 'react-native-figma-squircle';
import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { SvgCssUri } from 'react-native-svg';
import Image from 'react-native-remote-svg';

import VideoNFTDisplay from './components/VideoNFTDisplay';
import styles from './styles';

const NftDisplayer = ({ url, style, type, isDetailView }) => {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  const hideSpinner = () => {
    setLoading(false);
  };

  const htmlBody = (
    <View style={[styles.image, style]}>
      <WebView
        onLoad={hideSpinner}
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webView}
      />
      {loading && <ActivityIndicator style={styles.activityIndicator} />}
    </View>
  );

  const videoBody = (
    <VideoNFTDisplay
      url={url}
      hideSpinner={hideSpinner}
      style={styles.image}
      loading={loading}
      isDetailView={isDetailView}
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
};

export default NftDisplayer;
