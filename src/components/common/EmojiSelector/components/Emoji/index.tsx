import React from 'react';

import { Text, Touchable } from '@/components/common';

import { charFromEmojiObject } from '../../utils';
import styles from './styles';

interface Props {
  onSelect: (emoji: string) => void;
  emojiObject: any;
  isLastEmoji: boolean;
}

function Emoji({ onSelect, emojiObject, isLastEmoji }: Props) {
  const charEmoji = charFromEmojiObject(emojiObject);
  const margin = { marginRight: isLastEmoji ? 0 : 10 };

  return (
    <Touchable onPress={() => onSelect(charEmoji)}>
      <Text style={[styles.emojiText, margin]}>{charEmoji}</Text>
    </Touchable>
  );
}

export default Emoji;
