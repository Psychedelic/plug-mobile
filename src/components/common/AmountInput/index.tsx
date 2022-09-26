import { t } from 'i18next';
import React from 'react';
import { Keyboard, StyleProp, TextStyle, ViewStyle } from 'react-native';

import Button from '@/buttons/Button';
import { Colors } from '@/constants/theme';
import { isValidDecimal } from '@/utils/number';

import Text from '../Text';
import TextInput from '../TextInput';
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
  disabled?: boolean;
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
  disabled,
}: Props) => {
  const handleOnFocus = () => {
    setSelected(symbol);
  };

  const handleMaxAmount = () => {
    onMaxPress?.();
  };

  const handleChange = (newText: string) => {
    if (isValidDecimal(newText) || !newText.length) {
      onChange(newText);
    }
  };

  return (
    <TextInput
      style={containerStyle}
      underlineColorAndroid="transparent"
      inputStyle={[styles.text, inputStyle]}
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
      disabled={disabled}
      right={
        <>
          {!!selected && !!onMaxPress && (
            <Button
              text={t('common.max')}
              onPress={() => handleMaxAmount()}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          )}
          <Text style={styles.symbol}>{symbol}</Text>
        </>
      }
    />
  );
};

export default AmountInput;
