import React, { useState } from 'react';
import { View } from 'react-native';

import EmojiBar from './components/EmojiBar';
import EmojiBoard from './components/EmojiBoard';
import EmojiCategoryTitle from './components/EmojiCategoryTitle';
import styles from './styles';
import { Categories } from './utils';

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
