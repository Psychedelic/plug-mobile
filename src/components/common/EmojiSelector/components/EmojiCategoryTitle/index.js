import React from 'react';
import { Text } from 'react-native';

import styles from './styles';

function EmojiCategoryTitle({ currentCategory }) {
  return <Text style={styles.emojiCategoryTytle}>{currentCategory.name}</Text>;
}

export default EmojiCategoryTitle;
