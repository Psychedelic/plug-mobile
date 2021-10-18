import React, { useRef } from 'react';
import Touchable from '../../animations/Touchable';
import Button from '../../buttons/Button';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors, FontStyles } from '../../../constants/theme';
import animationScales from '../../../utils/animationScales';

const AmountInput = ({ value, onChange,
  selected, setSelected,
  symbol, maxAmount,
  autoFocus, customStyle,
}) => {
  const inputRef = useRef();

  const handleMaxAmount = () => {
    onChange(String(maxAmount));
  }

  const onPress = () => {
    inputRef?.current.focus();
    setSelected(symbol);
  }

  return (
    <Touchable scale={animationScales.small} onPress={onPress}>
      <View style={[styles.container, customStyle]}>

        <TextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          style={styles.textInput}
          placeholderTextColor='#373946'
          onChangeText={onChange}
          value={value}
          keyboardType="numeric"
          placeholder='0.0'
          autoFocus={autoFocus}
          keyboardAppearance='dark'
          selectionColor={Colors.White.Primary}
          onFocus={() => setSelected(symbol)}
        />
        {
          selected &&
          <Button
            variant="gray"
            text="Max"
            onPress={() => handleMaxAmount()}
            buttonStyle={{ width: 41, height: 24, borderRadius: 8 }}
            textStyle={{ fontSize: 14 }}
          />
        }
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
    </Touchable>
  )
}

export default AmountInput;

const styles = StyleSheet.create({
  textInput: {
    ...FontStyles.Normal,
    fontSize: 24,
    marginRight: 'auto',
  },
  container: {
    backgroundColor: Colors.Black.Primary,
    flexDirection: 'row',
    height: 63,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  symbol: {
    ...FontStyles.NormalGray,
    fontWeight: '500',
    marginLeft: 12,
  }
})