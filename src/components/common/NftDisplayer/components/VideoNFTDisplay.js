import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Video from 'react-native-video';

import styles from '../styles';

const VideoNFTDisplay = ({ nft, hideSpinner, style, url, loading }) => {
  return (
    <View style={[styles.image, style]}>
      <Video
        repeat
        onLoad={hideSpinner}
        resizeMode="cover"
        source={{ uri: url }}
        style={{ ...styles.image, height: 165, width: 165 }}
      />
      {loading && !url && (
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
