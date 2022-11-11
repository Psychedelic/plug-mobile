import React, { useRef } from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import sharedStyles from '../../styles';

interface Props {
  loading?: boolean;
  onLoad?: () => void;
  url: string;
  style: StyleProp<ViewStyle>;
  type: string;
}

const Spinner = ({ style }: { style?: StyleProp<ViewStyle> }) => (
  <View style={[sharedStyles.webViewLoader, style]}>
    <ActivityIndicator size="small" color="white" />
  </View>
);

function HTMLDisplayer({ loading, onLoad, url, style, type }: Props) {
  const webViewRef = useRef(null);

  return (
    <View style={style}>
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
        renderLoading={() => <Spinner style={style} />}
        style={[sharedStyles.webView, style]}
      />
      {loading && <Spinner style={style} />}
    </View>
  );
}

export default HTMLDisplayer;
