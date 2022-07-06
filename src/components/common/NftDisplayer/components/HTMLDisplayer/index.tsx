import React, { useRef } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import sharedStyles from '../../styles';

interface Props {
  loading?: boolean;
  onLoad?: () => void;
  url: string;
  style: StyleProp<ViewStyle>;
  isSendView?: boolean;
  isDetailView?: boolean;
  type: string;
}

function HTMLDisplayer({
  loading,
  onLoad,
  url,
  style,
  isSendView,
  type,
  isDetailView,
}: Props) {
  const webViewRef = useRef(null);

  const Spinner = () => (
    <View
      style={[
        sharedStyles.webViewLoader,
        (isDetailView || isSendView) && sharedStyles.webViewLoaderDetail,
      ]}>
      <ActivityIndicator size="small" color="white" />
    </View>
  );

  return (
    <View style={[sharedStyles.image, style]}>
      <WebView
        onLoad={onLoad}
        ref={webViewRef}
        source={
          type?.includes('html')
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
        renderLoading={Spinner}
        style={isSendView ? sharedStyles.webViewSend : sharedStyles.webView}
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
