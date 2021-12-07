import React, { useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Video from 'react-native-video';

import styles from '../styles';

const VideoNFTDisplay = ({ nft, hideSpinner, style, url, loading }) => {
  const ref = useRef(null);
  return (
    <View style={[styles.image, style]}>
      <Video
        onError={hideSpinner}
        onLoad={hideSpinner}
        source={{ uri: url, type: 'mp4' }}
        style={{ ...styles.image, height: 165, width: 165 }}
        ref={ref}
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
};

export default VideoNFTDisplay;
