import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import { Keyboard, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Button from '@/buttons/Button';
import Touchable from '@/commonComponents/Touchable';
import { Colors, Rainbow } from '@/constants/theme';
import animationScales from '@/utils/animationScales';
import { isDecimal } from '@/utils/number';

import styles from './styles';

const AmountInput = ({
  value,
  onChange,
  selected,
  setSelected,
  customPlaceholder,
  symbol,
  maxAmount,
  autoFocus,
  containerStyle,
  inputStyle,
}) => {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
    setSelected(symbol);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  const handleMaxAmount = () => {
    onChange(String(maxAmount));
  };

  const handleChange = newText => {
    if (isDecimal(newText) || !newText.length) {
      onChange(newText);
    }
  };

  const onPress = () => {
    inputRef?.current.focus();
    setSelected(symbol);
  };
  return (
    <Touchable scale={animationScales.small} onPress={onPress}>
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
        {!!selected && !!maxAmount && (
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
