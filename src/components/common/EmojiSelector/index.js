import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Touchable from '../../animations/Touchable';
import emoji from 'emoji-datasource';

const Categories = {
  emotion: {
    symbol: '😀',
    name: 'Smileys & Emotion',
  },
  people: {
    symbol: '🧑',
    name: 'People & Body',
  },
  nature: {
    symbol: '🦄',
    name: 'Animals & Nature',
  },
  food: {
    symbol: '🍔',
    name: 'Food & Drink',
  },
  activities: {
    symbol: '⚾️',
    name: 'Activities',
  },
  places: {
    symbol: '✈️',
    name: 'Travel & Places',
  },
  objects: {
    symbol: '💡',
    name: 'Objects',
  },
  symbols: {
    symbol: '🔣',
    name: 'Symbols',
  },
  flags: {
    symbol: '🏳️',
    name: 'Flags',
  },
};

// Utils
export const charFromUtf16 = utf16 =>
  String.fromCodePoint(...utf16.split('-').map(u => '0x' + u));
export const charFromEmojiObject = obj => charFromUtf16(obj.unified);
export const filteredEmojis = emoji.filter(e => !e.obsoleted_by);
export const emojiByCategory = category =>
  filteredEmojis.filter(e => e.category === category.name);
export const sortEmoji = list =>
  list.sort((a, b) => a.sort_order - b.sort_order);
export const categoryKeys = Object.keys(Categories);
export const splitToRows = list => {
  const result = [];

  while (list.length > 0) {
    result.push(list.splice(0, 8));
  }

  return result;
};

// Components

const Emoji = ({ onSelect, emojiObject, category = false }) => {
  const charEmoji = charFromEmojiObject(emojiObject);

  return (
    <Touchable onPress={() => onSelect(charEmoji)}>
      <Text style={{ color: '#FFFFFF', fontSize: 32, marginRight: 14 }}>
        {charEmoji}
      </Text>
    </Touchable>
  );
};

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
              <Text style={{ fontSize: 16 }}>{category.symbol}</Text>
            </View>
          </Touchable>
        );
      })}
    </View>
  );
};

const EmojiCategoryTitle = ({ currentCategory }) => (
  <Text style={styles.emojiCategoryTytle}>{currentCategory.name}</Text>
);

const EmojiBoard = ({ onSelect, currentCategory }) => {
  const categoryEmojis = emojiByCategory(currentCategory);
  const sortedEmojis = sortEmoji(categoryEmojis);
  const rowsToDisplay = splitToRows(sortedEmojis);

  return (
    <View style={styles.emojiBoard}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {rowsToDisplay.map((row, index) => (
          <View
            style={styles.emojiBoardRow}
            key={`${currentCategory}-${index}`}>
            {row.map((emojiObject, j) => (
              <Emoji
                onSelect={onSelect}
                emojiObject={emojiObject}
                key={`${emojiObject.utf16}-${j}`}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const EmojiSelector = ({ onSelect }) => {
  const [currentCategory, setCurrentCategory] = useState(Categories.emotion);

  return (
    <View style={styles.emojiSelector}>
      <EmojiCategoryTitle currentCategory={currentCategory} />
      <EmojiBoard onSelect={onSelect} currentCategory={currentCategory} />
      <EmojiBar
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emojiSelector: {
    marginTop: 24,
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 24,
  },
  emojiBoard: {
    height: 250,
  },
  emojiBoardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  emojiCategoryTytle: {
    fontSize: 16,
    marginBottom: 3,
    color: 'rgba(235, 235, 245, 0.6)',
  },
  emojiBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: 35,
  },
  categoryEmoji: {
    height: 38,
    width: 38,
    borderRadius: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmojiSelector;
