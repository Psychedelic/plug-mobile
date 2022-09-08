import React, { useState } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

import { ICNS_LOGO } from '@/services/ICNS';

import Image from '../Image';
import Text from '../Text';
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
      )}
      {ICNSName && (
        <View
          style={{
            position: 'absolute',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 12,
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Image
            style={[
              {
                height: 20,
                width: 60,
              },
              isDetailView && {
                height: 40,
                width: 120,
              },
            ]}
            resizeMode="contain"
            url={ICNS_LOGO}
          />
          <Text
            type="headline1"
            numberOfLines={1}
            style={[
              {
                fontSize: 18,
              },
              isDetailView && {
                fontSize: 30,
              },
            ]}>
            {ICNSName}
          </Text>
        </View>
      )}
    </View>
  ) : (
    <ActivityIndicator
      style={isSend ? styles.sendActivityIndicator : styles.activityIndicator}
      color="white"
    />
  );
};

export default NftDisplayer;
