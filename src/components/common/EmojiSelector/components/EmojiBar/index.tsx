import React from 'react';
import { View } from 'react-native';

import { Text, Touchable } from '@/components/common';
import { Colors } from '@/constants/theme';

import { Categories, Category } from '../../utils';
import styles from './styles';

interface Props {
  currentCategory: Category;
  setCurrentCategory: (category: Category) => void;
}

function EmojiBar({ currentCategory, setCurrentCategory }: Props) {
  return (
    <View style={styles.emojiBar}>
      {Categories.map((category: Category) => {
        const backgroundColor =
          category.name === currentCategory.name
            ? Colors.White.Secondary
            : Colors.Black.Pure;

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
}

export default EmojiBar;
