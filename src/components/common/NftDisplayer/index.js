import React, { useEffect, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import { ActivityIndicator, Image, View } from 'react-native';
import styles from './styles';

const TYPE_MAP = {
  'video/mp4': 'video',
  'image/png': 'img',
  'text/html': 'iframe',
};

const NftDisplayer = ({ url, style }) => {
  const [type, setType] = useState('img');
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

  useEffect(() => {
    fetch(url).then(response => {
      setType(response.headers.get('Content-Type'));
    });
  }, [url]);

  const hideSpinner = () => setLoading(false);

  const Tag = TYPE_MAP[type] || 'img';

  if (Tag === 'iframe') {
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

  if (Tag === 'video') {
    return (
      <View style={[styles.image, style]}>
        <Video
          onLoad={hideSpinner}
          source={{ uri: url }}
          style={styles.image}
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

  return (
    <Image
      resizeMode="cover"
      style={[styles.image, style]}
      source={{ uri: url }}
    />
  );
};

export default NftDisplayer;
