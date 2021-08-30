import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Metrics, Colors, FontStyle} from '../definitions/theme';

const EmptyState = props => {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={require('../assets/images/box.png')}
        resizeMode="contain"
        style={styles.icon}
      />
      <Text style={styles.label}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: Metrics.Margin * 2,
  },
  label: {
    ...FontStyle.NormalBold,
    color: Colors.GrayScale.SuperDark,
    textAlign: 'center',
  },
});
export default EmptyState;
