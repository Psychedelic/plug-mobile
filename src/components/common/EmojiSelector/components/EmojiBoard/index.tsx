import React from 'react';
import { ScrollView, View } from 'react-native';

import { Category, emojiByCategory, sortEmoji, splitToRows } from '../../utils';
import Emoji from '../Emoji';
import styles from './styles';

interface Props {
  onSelect: () => void;
  currentCategory: Category;
}

function EmojiBoard({ onSelect, currentCategory }: Props) {
  const categoryEmojis = emojiByCategory(currentCategory);
  const sortedEmojis = sortEmoji(categoryEmojis);
  const rowsToDisplay = splitToRows(sortedEmojis);

  return (
    <View style={styles.emojiBoard}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        {rowsToDisplay.map((row, index) => {
          const isLastRow = rowsToDisplay?.length === index + 1;
          return (
            <View
              style={[styles.emojiBoardRow, isLastRow && styles.lastBoardRow]}
              key={`${currentCategory}-${index}`}>
              {row.map((emojiObject, emojiIndex) => {
                console.tron.log('emojiObject', emojiObject);
                console.tron.log('emojiIndex', emojiIndex);
                return (
                  <Emoji
                    isLastEmoji={emojiIndex + 1 === row?.length}
                    onSelect={onSelect}
                    emojiObject={emojiObject}
                    key={`${emojiObject.utf16}-${emojiIndex}`}
                  />
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default EmojiBoard;
