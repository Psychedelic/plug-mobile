import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Add from '@/components/icons/svg/AddNote.svg';
import Search from '@/components/icons/svg/Search.svg';
import animationScales from '@/utils/animationScales';

import TextInput from '../TextInput';
import Touchable from '../Touchable';
import styles, { searchColor } from './styles';

interface Props {
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onActionPress?: () => void;
}

function SearchBar({
  placeholder,
  style,
  onChangeText,
  onActionPress,
  containerStyle,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        contentContainerStyle={[styles.inputContent, containerStyle]}
        style={styles.input}
        onChangeText={onChangeText}
        inputStyle={styles.inputStyle}
        left={<Search fill={searchColor} style={styles.searchIcon} />}
      />
      {onActionPress && (
        <Touchable
          scale={animationScales.medium}
          style={styles.addButton}
          onPress={onActionPress}>
          <Add width={24} height={24} />
        </Touchable>
      )}
    </View>
  );
}

export default SearchBar;
