import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors, FontStyle, Metrics} from '../definitions/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Checkbox = props => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    props.handleChecked(checked);
  }, [checked, props]);

  return (
    <View style={styles.checkboxContainer}>
      {checked ? (
        <TouchableOpacity
          onPress={() => {
            setChecked(!checked);
          }}
          style={styles.checkbox}>
          
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setChecked(!checked);
          }}
          style={styles.unCheckbox}
        />
      )}
      <Text style={styles.checkboxLabel}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    position: 'relative',
  },
  checkboxLabel: {
    ...FontStyle.Normal,
    letterSpacing: 1,
    color: Colors.GrayScale.SuperDark,
    paddingLeft: Metrics.Padding,
  },
  checkbox: {
    backgroundColor: Colors.Primary,
    borderRadius: 8,
    zIndex: 1,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unCheckbox: {
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1,
    width: 25,
    height: 25,
  },
  iconButton: {
    height: 18,
    width: 18,
  },
});

export default Checkbox;
