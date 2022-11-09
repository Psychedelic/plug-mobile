import React from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import { FileTypes } from '@/interfaces/general';

import ICNSDisplayer from './components/ICNSDisplayer';
import ImageDisplayer from './components/ImageDisplayer';
import VideoDisplayer from './components/VideoDisplayer';
import styles from './styles';

interface Props {
  url: string;
  style?: StyleProp<ViewStyle>;
  type?: FileTypes;
  isDetailView?: boolean;
  ICNSName?: string;
}

const NftDisplayer = ({ url, style, type, isDetailView, ICNSName }: Props) => {
  console.log(type, url);
  return type ? (
    <>
      {type?.includes('video') ? (
        <VideoDisplayer url={url} style={[styles.image, style]} />
      ) : (
        <ImageDisplayer url={url} type={type} style={style} />
      )}
      {ICNSName && (
        <ICNSDisplayer
          ICNSName={ICNSName}
          size={isDetailView ? 'big' : 'small'}
        />
      )}
    </>
  ) : (
    <ActivityIndicator color="white" style={style} />
  );
};

export default NftDisplayer;
