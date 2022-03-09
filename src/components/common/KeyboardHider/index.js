import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import { isIos } from '../../../constants/platform';

const containerStyle = { flex: 1 };

const KeyboardHider = ({ children }) => {
  const handleClose = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={containerStyle}
      behavior={isIos ? 'height' : 'padding'}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <>{children}</>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardHider;
