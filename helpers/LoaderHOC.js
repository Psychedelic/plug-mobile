import React, {useState} from 'react';

import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {Colors, FontStyle, Metrics} from '../constants/theme';

const LoaderHOC = (WrappperComponent, loadinMessage) => {
  function HOC(props) {
    const [isLoading, setIsLoading] = useState(true);

    //Function to be able to change loader state from WrapperComponet passing it through props
    const setLoadingState = isComponentLoading => {
      setIsLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.Primary} />
            <Text style={styles.loaderText}>{loadinMessage}</Text>
          </View>
        )}
        <WrappperComponent {...props} setLoading={setLoadingState} />
      </>
    );
  }

  return HOC;
};

const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: Colors.Background,
    width: Metrics.ScreenWidth,
    height: Metrics.ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    ...FontStyle.Subtitle,
    color: Colors.GrayScale.SuperDark,
    marginTop: Metrics.Margin,
  },
});

export default LoaderHOC;
