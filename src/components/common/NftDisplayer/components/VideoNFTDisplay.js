import React from 'react';
import Video from 'react-native-video';
import { ActivityIndicator, View } from 'react-native';

import useFileDownload from '../../../../hooks/useFileDownload';
import sharedStyles from '../styles';

const VideoNFTDisplay = ({ hideSpinner, style, url, loading }) => {
  const newUrl = useFileDownload(url);

  return (
    <View style={[sharedStyles.image, style]}>
      <Video
        repeat
        onLoad={hideSpinner}
        resizeMode="cover"
        source={{ uri: newUrl }}
        style={sharedStyles.video}
      />
      {loading && !newUrl && (
        <ActivityIndicator style={sharedStyles.activityIndicator} />
      )}
    </View>
  );
};

export default VideoNFTDisplay;
