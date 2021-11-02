import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import { Image } from 'react-native';
import styles from '../UserIcon/styles';

const TYPE_MAP = {
  'video/mp4': 'video',
  'image/png': 'img',
  'text/html': 'iframe'
};

const NftDisplayer = ({ url, style, onPress, interactive }) => {
  const [type, setType] = useState();

  useEffect(() => {
    fetch(url)
      .then(response => {
        console.log('res', response);
        console.log('url', url)
        setType(response.headers.get('Content-Type'));
      })
  }, []);

  const Tag = TYPE_MAP[type] || 'img';

  if (Tag === 'iframe') {
    return (
      <WebView
        javaScriptEnabled
        source={url}
        style={[style]}
      />
    )
  }

  if (Tag === 'video') {
    return (
      <Video
        source={{ uri: url }}
        style={styles.backgroundVideo}
      />
    )
  }

  return (
    <Image
      width={100}
      height={100}
      source={{ uri: url }}
      style={{ flex: 1 }}
    />
  );
}

export default NftDisplayer;
