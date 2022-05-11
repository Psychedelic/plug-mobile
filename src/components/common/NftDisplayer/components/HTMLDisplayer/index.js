import React, { useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

import sharedStyles from '../../styles';

function HTMLDisplayer({
  loading,
  hideSpinner,
  url,
  style,
  isSendView,
  type,
  isDetailView,
}) {
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
        onLoad={hideSpinner}
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
      {loading && <ActivityIndicator style={sharedStyles.activityIndicator} />}
    </View>
  );
}

export default HTMLDisplayer;
