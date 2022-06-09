import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import ImageDisplayer from './components/ImageDisplayer';
import VideoDisplayer from './components/VideoDisplayer';
import styles from './styles';

const NftDisplayer = ({ url, style, type, isDetailView, isSend }) => {
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
