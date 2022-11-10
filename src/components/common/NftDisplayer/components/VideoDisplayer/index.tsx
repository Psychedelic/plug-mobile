import React, { useState } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import Video from 'react-native-video';

import useFileDownload from '@/hooks/useFileDownload';

import sharedStyles from '../../styles';

interface Props {
  style: StyleProp<ViewStyle>;
  url: string;
  paused?: boolean;
}

const VideoDisplayer = ({ style, url, paused }: Props) => {
  const [loading, setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  };

  const newUrl = useFileDownload({ url, format: 'mp4' });

  return (
    <>
      {loading && !newUrl ? (
        <ActivityIndicator style={[sharedStyles.video, style]} color="white" />
      ) : (
        <Video
          repeat
          paused={paused}
          onLoad={hideSpinner}
          resizeMode="cover"
          source={{ uri: newUrl }}
          selectedVideoTrack={{
            type: 'resolution',
            value: 480,
          }}
          style={[sharedStyles.video, style]}
        />
      )}
    </>
  );
};

export default VideoDisplayer;
