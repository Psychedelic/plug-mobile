import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

import {Colors, FontStyle, Metrics, Shadow} from '../definitions/theme';

const InputField = props => {
  return (
    <>
      <TextInput
        placeholder={props.label}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        value={props.value}
        style={styles.input}
        autoCapitalize="none"
        editable={props.editable}
      />
      {props.error}
    </>
  );
};

const styles = StyleSheet.create({
  inputSize: {
    height: 50,
    width: '100%',
  },
  input: {
    ...FontStyle.Normal,
    paddingHorizontal: Metrics.Padding,
    backgroundColor: Colors.White.Medium,
    ...Shadow,
    height: 50,
    width: '100%',
    borderRadius: Metrics.BorderRadius,
    marginBottom: Metrics.Margin,
  },
});

export default InputField;
