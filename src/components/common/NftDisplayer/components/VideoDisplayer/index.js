import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Video from 'react-native-video';

import useFileDownload from '@/hooks/useFileDownload';

import sharedStyles from '../../styles';

const VideoDisplayer = ({
  hideSpinner,
  style,
  url,
  loading,
  isDetailView,
  isSendView,
}) => {
  const newUrl = useFileDownload({ url, format: 'mp4' });

  return (
    <View
      style={[
        sharedStyles.container,
        isDetailView && sharedStyles.containerDetail,
        isSendView && sharedStyles.containerSend,
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
            value: 480,
          }}
          style={[
            sharedStyles.video,
            isDetailView && sharedStyles.videoDetail,
            isSendView && sharedStyles.videoSend,
          ]}
        />
      )}
    </View>
  );
};

export default VideoDisplayer;
