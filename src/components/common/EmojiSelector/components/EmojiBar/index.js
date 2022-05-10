import React from 'react';
import { Text, View } from 'react-native';

import Touchable from '@/commonComponents/Touchable';

import { Categories, categoryKeys } from '../../utils';
import styles from './styles';

const EmojiBar = ({ currentCategory, setCurrentCategory }) => {
  return (
    <View style={styles.emojiBar}>
      {categoryKeys.map(c => {
        const category = Categories[c];
        const backgroundColor =
          category.name === currentCategory.name
            ? 'rgba(120, 120, 128, 0.36)'
            : '#000000';

        return (
          <Touchable
            key={category.name}
            onPress={() => {
              setCurrentCategory(category);
            }}>
            <View style={{ ...styles.categoryEmoji, backgroundColor }}>
              <Text style={styles.categorySymbolText}>{category.symbol}</Text>
            </View>
          </Touchable>
        );
      })}
    </View>
  );
};

export default EmojiBar;
