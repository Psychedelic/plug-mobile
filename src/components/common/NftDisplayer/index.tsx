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
        <>
          <View
            style={{
              top: 20,
              left: 20,
              zIndex: 4,
              elevation: 4,
              position: 'absolute',
            }}>
            <Image
              style={[
                {
                  height: 20,
                },
                isDetailView && {
                  height: 40,
                },
              ]}
              resizeMode="contain"
              url={ICNS_LOGO}
            />
          </View>
          <Text
            type="headline1"
            numberOfLines={1}
            style={[
              {
                bottom: 20,
                fontSize: 18,
                paddingHorizontal: 20,
                position: 'absolute',
              },
              isDetailView && {
                fontSize: 30,
              },
            ]}>
            {ICNSName}
          </Text>
        </>
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
