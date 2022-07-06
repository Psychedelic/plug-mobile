import React, { useState } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import ImageDisplayer from './components/ImageDisplayer';
import VideoDisplayer from './components/VideoDisplayer';
import styles from './styles';

interface Props {
  url: string;
  style: StyleProp<ViewStyle>;
  type?: string;
  isDetailView?: boolean;
  isSend?: boolean;
}

const NftDisplayer = ({ url, style, type, isDetailView, isSend }: Props) => {
  const [loading, setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  };

  return type ? (
    type?.includes('video') ? (
      <VideoDisplayer
        url={url}
        loading={loading}
        style={styles.image}
        onLoad={hideSpinner}
        isDetailView={isDetailView}
        isSendView={isSend}
      />
    ) : (
      <ImageDisplayer
        style={style}
        type={type}
        url={url}
        isSendView={isSend}
        isDetailView={isDetailView}
      />
    )
  ) : (
    <ActivityIndicator
      style={isSend ? styles.sendActivityIndicator : styles.activityIndicator}
      color="white"
    />
  );
};

export default NftDisplayer;
