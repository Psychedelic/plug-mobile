import React from 'react';
import Video from 'react-native-video';
import { ActivityIndicator, View } from 'react-native';

import useFileDownload from '../../../../../hooks/useFileDownload';
import sharedStyles from '../../styles';

const VideoDisplayer = ({ hideSpinner, style, url, loading, isDetailView, quality }) => {
  const newUrl = useFileDownload(url);

  return (
    <View
      style={[
        sharedStyles.container,
        isDetailView && sharedStyles.containerDetail,
        style,
      ]}>
      {loading && !newUrl ? (
        <ActivityIndicator style={sharedStyles.activityIndicator} />
      ) : (
        <Video
          repeat
          onLoad={hideSpinner}
          resizeMode="cover"
          source={{ uri: newUrl }}
          selectedVideoTrack={{
            type: 'resolution',
            value: quality,
          }}
          style={[sharedStyles.video, isDetailView && sharedStyles.videoDetail]}
        />
      )}
    </View>
  );
};

export default VideoDisplayer;
