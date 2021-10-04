import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../../../constants/theme';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const Container = ({ children, customStyle }) => {
  return (
    <View style={[styles.container, customStyle]}>
      <MyStatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.outerContainer} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  outerContainer: {
    backgroundColor: Colors.Black.Pure,
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.Black.Primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
