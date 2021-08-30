import * as React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Shadow, Colors, Metrics, FontStyle} from '../definitions/theme';

const styleIconBySize = (sizeNumber = 25) => {
  return {width: sizeNumber, height: sizeNumber};
};
const Header = props => {
  return (
    <SafeAreaView style={styles.headerContent}>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={[Shadow, styles.headerContainerButton]}>
        <Image
          source={props.icon}
          resizeMode="contain"
          style={styleIconBySize(props.iconSize)}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{props.title}</Text>

      {props.component}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    padding: Metrics.Padding,
    paddingBottom: 0,
    flexDirection: 'column',
  },
  headerContainerButton: {
    height: 50,
    width: 50,
    backgroundColor: Colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 25,
  },
  headerTitle: {
    ...FontStyle.Big,
    color: Colors.GrayScale.SuperDark,
    width: '70%',
    marginBottom: Metrics.Margin / 2,
  },
});

export default Header;
