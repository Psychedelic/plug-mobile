import React, { useState } from 'react';
import { View } from 'react-native';

import EmojiCategoryTitle from './components/EmojiCategoryTitle';
import EmojiBoard from './components/EmojiBoard';
import EmojiBar from './components/EmojiBar';
import { Categories } from './utils';
import styles from './styles';

function EmojiSelector({ onSelect }) {
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
}

export default EmojiSelector;
