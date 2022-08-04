import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import TextInput from '../TextInput';
import styles from './styles';

interface Props {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
}

function SearchBar({ placeholder, style }: Props) {
  return (
    <View style={style}>
      <TextInput
        placeholder={placeholder}
        variant="text"
        customStyle={styles.input}
      />
    </View>
  );
}

export default SearchBar;
