import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import animationScales from '../../utils/animationScales';
import { FontStyles } from '../../constants/theme';
import Touchable from '../animations/Touchable';
import TokenFormat from '../number/TokenFormat';
import UsdFormat from '../number/UsdFormat';
import TokenIcon from './TokenIcon';

function TokenItem({
  icon,
  name,
  amount,
  value,
  symbol,
  color,
  style,
  onPress,
}) {
  const handleOnPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Touchable scale={animationScales.small} onPress={handleOnPress}>
      <View style={[styles.root, style]}>
        <TokenIcon icon={icon} symbol={symbol} color={color} />
        <View style={styles.leftContainer}>
          <Text style={FontStyles.Normal}>{name}</Text>
          <TokenFormat
            value={amount}
            token={symbol}
            style={FontStyles.NormalGray}
          />
        </View>
        <UsdFormat value={value} style={styles.value} />
      </View>
    </Touchable>
  );
}

export default TokenItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  value: {
    ...FontStyles.Normal,
    marginLeft: 'auto',
    alignSelf: 'flex-start',
  },
});
