import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import {
  Keyboard,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '@/buttons/Button';
import Touchable from '@/commonComponents/Touchable';
import { Colors, Rainbow } from '@/constants/theme';
import animationScales from '@/utils/animationScales';
import { isValidDecimal } from '@/utils/number';

import styles from './styles';

interface Props {
  value?: string;
  selected: any;
  setSelected: (value: any) => void;
  symbol: string;
  autoFocus?: boolean;
  customPlaceholder?: string;
  onChange: (value: string) => void;
  onMaxPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const AmountInput = ({
  value,
  onChange,
  onMaxPress,
  selected,
  setSelected,
  customPlaceholder,
  symbol,
  autoFocus,
  containerStyle,
  inputStyle,
}: Props) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
    setSelected(symbol);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const handleMaxAmount = () => {
    onMaxPress?.();
  };

  const handleChange = (newText: string) => {
    if (isValidDecimal(newText) || !newText.length) {
      onChange(newText);
    }
  };

  const handlePress = () => {
    inputRef?.current?.focus();
    setSelected(symbol);
  };

  return (
    <Touchable scale={animationScales.small} onPress={handlePress}>
      {!!isFocused && (
        <LinearGradient
          style={[styles.focusedGradient, containerStyle]}
          {...Rainbow}
        />
      )}
      <View style={[styles.container, containerStyle]}>
        <TextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          style={[styles.textInput, inputStyle]}
          placeholderTextColor="#373946"
          onChangeText={handleChange}
          value={value}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          maxLength={20}
          placeholder={customPlaceholder || t('placeholders.amount')}
          blurOnSubmit={false}
          autoFocus={autoFocus}
          keyboardAppearance="dark"
          selectionColor={Colors.White.Secondary}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        {!!selected && !!onMaxPress && (
          <Button
            variant="gray"
            text="Max"
            onPress={() => handleMaxAmount()}
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        )}
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
    </Touchable>
  );
};

export default AmountInput;
