import React from 'react';
import { Colors } from '../../constants/theme';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputStyle: {
    paddingTop: 13,
    paddingLeft: 20,
    paddingBottom: 13,
    paddingRight: 20,
    height: 56,
    width: '100%',
    backgroundColor: Colors.Background.Primary,
    color: Colors.White.Pure,
    borderRadius: 15,
    fontWeight: "600",
    fontSize: 18,
  },
  innerLabelStyle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: "600",
    paddingRight: 14,
  },
  labledInputStyle: {
    flex: 12,
    paddingLeft: 0,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 15,
  },
  labledViewStyle: {
    flexWrap: 'nowrap',
    paddingTop: 13,
    paddingLeft: 20,
    paddingBottom: 13,
    backgroundColor: Colors.Background.Primary,
  }
});

const variants = {
  password: {
    viewStyle: styles.viewStyle,
    inputStyle: styles.inputStyle,
    placeholderTextColor: Colors.White.Secondary,
    autoCorrect: false,
    autoCapitalize: 'none',
    secureTextEntry: true,
  },
  innerLabel: {
    viewStyle: { ...styles.viewStyle, ...styles.labledViewStyle },
    inputStyle: { ...styles.inputStyle, ...styles.labledInputStyle },
    innerLabelStyle: styles.innerLabelStyle,
    placeholderTextColor: Colors.White.Secondary,
    autoCorrect: false,
    autoCapitalize: 'none',
    secureTextEntry: false,
  },
};


const Input = ({ label, value, variant, onChangeText, placeholder, customStyle }) => {
  const {
    viewStyle,
    inputStyle,
    innerLabelStyle,
    placeholderTextColor,
    autoCorrect,
    autoCapitalize,
    secureTextEntry,
  } = variants[variant];

  return (
    <View style={[viewStyle, customStyle]}>
      { variant === 'innerLabel' && (
        <Text style={innerLabelStyle}>{label}</Text>
      )}
      <TextInput
        style={inputStyle}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

export default Input;
