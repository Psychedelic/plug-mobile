import React, { useState } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import Video from 'react-native-video';

import useFileDownload from '@/hooks/useFileDownload';
import { getExtension } from '@/utils/fileTypes';

import sharedStyles from '../../styles';

interface Props {
  style: StyleProp<ViewStyle>;
  url: string;
  type: string;
  paused?: boolean;
  filename?: string;
}

const VideoDisplayer = ({ style, url, paused, type, filename }: Props) => {
  const [loading, setLoading] = useState(true);
  const format = getExtension(type) || 'mp4';
  const newUrl = useFileDownload({ url, format, filename });

  const hideSpinner = () => {
    setLoading(false);
  };

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
