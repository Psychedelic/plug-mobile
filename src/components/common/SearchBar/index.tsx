import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Search from '@/components/icons/svg/Search.svg';
import animationScales from '@/utils/animationScales';

import TextInput from '../TextInput';
import Touchable from '../Touchable';
import styles, { searchColor } from './styles';

interface Props {
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

function SearchBar({ placeholder, style, onChangeText }: Props) {
  return (
    <View style={style}>
      <TextInput
        placeholder={placeholder}
        customStyle={styles.input}
        onChangeText={onChangeText}
        left={<Search fill={searchColor} style={styles.icon} />}
      />
      <Touchable scale={animationScales.small} style={styles.addButton} />
    </View>
  );
}

export default SearchBar;
