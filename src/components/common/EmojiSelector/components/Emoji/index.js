import React from 'react';
import { Text } from 'react-native';

import Touchable from '@commonComponents/Touchable';
import { charFromEmojiObject } from '../../utils';
import styles from './styles';

function Emoji({ onSelect, emojiObject, isLastEmoji }) {
  const charEmoji = charFromEmojiObject(emojiObject);
  const margin = { marginRight: isLastEmoji ? 0 : 10 };

  return (
    <Touchable onPress={() => onSelect(charEmoji)}>
      <Text style={[styles.emojiText, margin]}>{charEmoji}</Text>
    </Touchable>
  );
}

export default Emoji;
