import React, { useState } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

import ICNSDisplayer from './components/ICNSDisplayer';
import ImageDisplayer from './components/ImageDisplayer';
import VideoDisplayer from './components/VideoDisplayer';
import styles from './styles';

interface Props {
  url: string;
  style: StyleProp<ViewStyle>;
  type?: string;
  isDetailView?: boolean;
  isSend?: boolean;
  ICNSName?: string;
}

const NftDisplayer = ({
  url,
  style,
  type,
  isDetailView,
  isSend,
  ICNSName,
}: Props) => {
  const [loading, setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  };

  return type ? (
    <View>
      {type?.includes('video') ? (
        <VideoDisplayer
          url={url}
          loading={loading}
          isSendView={isSend}
          style={styles.image}
          onLoad={hideSpinner}
          isDetailView={isDetailView}
        />
      ) : (
        <ImageDisplayer
          url={url}
          type={type}
          style={style}
          isSendView={isSend}
          isDetailView={isDetailView}
        />
      )}
      {ICNSName && (
        <ICNSDisplayer
          ICNSName={ICNSName}
          size={isDetailView ? 'big' : 'small'}
        />
      )}
    </View>
  ) : (
    <ActivityIndicator
      color="white"
      style={isSend ? styles.sendActivityIndicator : styles.activityIndicator}
    />
  );
};

export default NftDisplayer;
