import React from 'react';
import { ScrollView, View } from 'react-native';

import { emojiByCategory, sortEmoji, splitToRows } from '../../utils';
import Emoji from '../Emoji';
import styles from './styles';

function EmojiBoard({ onSelect, currentCategory }) {
  const categoryEmojis = emojiByCategory(currentCategory);
  const sortedEmojis = sortEmoji(categoryEmojis);
  const rowsToDisplay = splitToRows(sortedEmojis);

  return (
    <View style={styles.emojiBoard}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {rowsToDisplay.map((row, index) => {
          const isLastRow = rowsToDisplay?.length === index + 1;
          return (
            <View
              style={[styles.emojiBoardRow, isLastRow && styles.lastBoardRow]}
              key={`${currentCategory}-${index}`}>
              {row.map((emojiObject, emojiIndex) => (
                <Emoji
                  isLastEmoji={emojiIndex + 1 === row?.length}
                  onSelect={onSelect}
                  emojiObject={emojiObject}
                  key={`${emojiObject.utf16}-${emojiIndex}`}
                />
              ))}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default EmojiBoard;
