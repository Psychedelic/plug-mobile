import React, { useRef } from 'react';
import Touchable from '../../animations/Touchable';
import Button from '../../buttons/Button';
import { Text, TextInput, View } from 'react-native';
import { Colors } from '../../../constants/theme';
import animationScales from '../../../utils/animationScales';
import styles from './styles';

const AmountInput = ({
  value,
  onChange,
  selected,
  setSelected,
  symbol,
  maxAmount,
  autoFocus,
  customStyle,
}) => {
  const inputRef = useRef();

  const handleMaxAmount = () => {
    onChange(String(maxAmount));
  };

  const onPress = () => {
    inputRef?.current.focus();
    setSelected(symbol);
  };

  return (
    <Touchable scale={animationScales.small} onPress={onPress}>
      <View style={[styles.container, customStyle]}>
        <TextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          style={styles.textInput}
          placeholderTextColor="#373946"
          onChangeText={onChange}
          value={value}
          keyboardType="numeric"
          placeholder="0.0"
          blurOnSubmit={false}
          autoFocus={autoFocus}
          keyboardAppearance="dark"
          selectionColor={Colors.White.Primary}
          onFocus={() => setSelected(symbol)}
        />
        {selected && (
          <Button
            variant="gray"
            text="Max"
            onPress={() => handleMaxAmount()}
            buttonStyle={{ width: 41, height: 24, borderRadius: 8 }}
            textStyle={{ fontSize: 14 }}
          />
        )}
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
    </Touchable>
  );
};

export default AmountInput;
