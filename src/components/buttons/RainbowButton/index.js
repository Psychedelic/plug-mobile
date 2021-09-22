import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../Button';
import { styles } from './styles';

import { Rainbow } from '../../../constants/theme';

const RainbowButton = ({ text, onPress, buttonStyle, textStyle }) => {
  return (
    <LinearGradient style={[styles.button, buttonStyle]} {...Rainbow}>
      <Button
        buttonStyle={[styles.buttonRainbow]}
        onPress={onPress}
        text={text}
        textStyle={[styles.textRainbow, textStyle]}
      />
    </LinearGradient>
  );
};

export default RainbowButton;
