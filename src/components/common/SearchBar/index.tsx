import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Search from '@/components/icons/svg/Search.svg';
import animationScales from '@/utils/animationScales';

import TextInput from '../TextInput';
import Touchable from '../Touchable';
import styles, { searchColor } from './styles';

interface Props {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

function SearchBar({ placeholder, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        customStyle={styles.input}
        left={<Search fill={searchColor} style={styles.icon} />}
      />
      <Touchable scale={animationScales.small} style={styles.addButton} />
    </View>
  );
}

export default SearchBar;
