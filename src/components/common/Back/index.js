import { t } from 'i18next';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Icon from '@/icons';

import styles from './styles';

function Back({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="chevronLeft" />
      <Text style={styles.text}>{t('common.back')}</Text>
    </TouchableOpacity>
  );
}

export default Back;
