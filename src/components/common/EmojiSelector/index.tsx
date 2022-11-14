import React, { useState } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/common';

import EmojiBar from './components/EmojiBar';
import EmojiBoard from './components/EmojiBoard';
import styles from './styles';
import { Categories } from './utils';

interface Props {
  onSelect: (emoji: string) => void;
}

function EmojiSelector({ onSelect }: Props) {
  const [currentCategory, setCurrentCategory] = useState(Categories[0]);

  return (
    <View style={styles.emojiSelector}>
      <Text type="subtitle3" style={styles.emojiCategoryTytle}>
        {currentCategory.name}
      </Text>
      <EmojiBoard onSelect={onSelect} currentCategory={currentCategory} />
      <EmojiBar
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
    </View>
  );
}

export default EmojiSelector;
