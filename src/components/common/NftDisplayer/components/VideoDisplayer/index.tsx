import React from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import Video from 'react-native-video';

import useFileDownload from '@/hooks/useFileDownload';

import sharedStyles from '../../styles';

interface Props {
  onLoad?: () => void;
  style: StyleProp<ViewStyle>;
  url: string;
  loading?: boolean;
  isDetailView?: boolean;
  isSendView?: boolean;
}

const VideoDisplayer = ({
  onLoad,
  style,
  url,
  loading,
  isDetailView,
  isSendView,
}: Props) => {
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
        <ActivityIndicator
          style={sharedStyles.activityIndicator}
          color="white"
        />
      ) : (
        <Video
          repeat
          onLoad={onLoad}
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
