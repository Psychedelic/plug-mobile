import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import ImageDisplayer from './components/ImageDisplayer';
import VideoDisplayer from './components/VideoDisplayer';
import HTMLDisplayer from './components/HTMLDisplayer';
import styles from './styles';

export const NFT_QUALITY = {
  LOW: 144,
  HIGH: 720,
};

const NftDisplayer = ({ url, style, type, isDetailView, quality = NFT_QUALITY.LOW }) => {
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
        hideSpinner={hideSpinner}
        isDetailView={isDetailView}
        quality={quality}
      />
    ) : type?.includes('html') ? (
      <HTMLDisplayer
        url={url}
        style={style}
        loading={loading}
        hideSpinner={hideSpinner}
      />
    ) : (
      <ImageDisplayer style={style} type={type} url={url} />
    )
  ) : (
    <ActivityIndicator style={styles.activityIndicator} />
  );
};

export default NftDisplayer;
