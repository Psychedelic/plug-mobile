import React, { useRef } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import { FileTypes } from '@/interfaces/general';

import sharedStyles from '../../styles';

interface Props {
  loading?: boolean;
  onLoad?: () => void;
  url: string;
  style: StyleProp<ViewStyle>;
  type: FileTypes;
}

const Spinner = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <View
    style={[
      sharedStyles.webViewLoader,
      sharedStyles.webViewLoaderDetail,
      style,
    ]}>
    <ActivityIndicator size="small" color="white" />
  </View>
);

function HTMLDisplayer({ loading, onLoad, url, style, type }: Props) {
  const webViewRef = useRef(null);

  return (
    <View style={[sharedStyles.image, style]}>
      <WebView
        onLoad={onLoad}
        ref={webViewRef}
        source={
          type === 'html'
            ? {
                uri: url,
              }
            : {
                html: `
            <head>
              <meta content="width=width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
            </head>
            <body style="background-image: url('${url}'); background-size:cover;"></body>
          `,
              }
        }
        scrollEnabled={false}
        startInLoadingState={true}
        renderLoading={() => <Spinner style={style} />}
        style={[sharedStyles.webView, style]}
      />
      {loading && (
        <ActivityIndicator
          style={sharedStyles.activityIndicator}
          color="white"
        />
      )}
    </View>
  );
}

export default HTMLDisplayer;
