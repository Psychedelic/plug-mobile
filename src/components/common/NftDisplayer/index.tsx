import React from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import ICNSDisplayer from './components/ICNSDisplayer';
import ImageDisplayer from './components/ImageDisplayer';
import VideoDisplayer from './components/VideoDisplayer';

interface Props {
  url: string;
  style?: StyleProp<ViewStyle>;
  type?: string;
  isDetailView?: boolean;
  ICNSName?: string;
  icnsSize?: 'big' | 'small';
  paused?: boolean;
}

const NftDisplayer = ({
  url,
  style,
  type,
  icnsSize,
  ICNSName,
  paused,
}: Props) => {
  return type ? (
    <>
      {type?.includes('video/') ? (
        <VideoDisplayer url={url} style={style} paused={paused} />
      ) : (
        <ImageDisplayer url={url} type={type} style={style} />
      )}
      {ICNSName && <ICNSDisplayer ICNSName={ICNSName} size={icnsSize} />}
    </>
  ) : (
    <ActivityIndicator color="white" style={style} />
  );
};

export default NftDisplayer;
