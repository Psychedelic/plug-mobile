import React from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import { deleteWhiteSpaces } from '@/utils/strings';

import ICNSDisplayer from './components/ICNSDisplayer';
import ImageDisplayer from './components/ImageDisplayer';
import VideoDisplayer from './components/VideoDisplayer';

interface Props {
  url: string;
  canisterId: string;
  itemId: string | number;
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
  canisterId,
  itemId,
  paused,
}: Props) => {
  const uniqueId = deleteWhiteSpaces(`${canisterId}${itemId}`);
  return type ? (
    <>
      {type?.includes('video/') ? (
        <VideoDisplayer
          url={url}
          style={style}
          paused={paused}
          type={type}
          filename={uniqueId}
        />
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
