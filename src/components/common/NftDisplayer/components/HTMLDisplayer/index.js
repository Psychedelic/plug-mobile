import { WebView } from 'react-native-webview';
import { ActivityIndicator, View } from 'react-native';
import React, { useRef } from 'react';

import sharedStyles from '../../styles';

function HTMLDisplayer({ loading, hideSpinner, url, style }) {
  const webViewRef = useRef(null);

  return (
    <View style={[sharedStyles.image, style]}>
      <WebView
        onLoad={hideSpinner}
        ref={webViewRef}
        source={{ uri: url }}
        style={sharedStyles.webView}
      />
      {loading && <ActivityIndicator style={sharedStyles.activityIndicator} />}
    </View>
  );
}

export default HTMLDisplayer;
