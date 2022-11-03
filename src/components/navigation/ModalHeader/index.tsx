import { StackHeaderProps } from '@react-navigation/stack';
import { t } from 'i18next';
import React from 'react';
import { Animated, View } from 'react-native';

import { ActionButton, Header, Text } from '@/components/common';
import { getRouteName } from '@/navigation/utils';

import styles from './styles';

interface Props extends StackHeaderProps {
  showBack?: boolean;
  showClose?: boolean;
}

function ModalHeader({
  navigation,
  route,
  showBack,
  showClose,
  progress,
}: Props) {
  const title = getRouteName(route.name);
  const opacity = Animated.add(
    progress.current,
    progress.next || 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.handle} />
      <Header
        style={styles.header}
        left={
          showBack && (
            <ActionButton
              label={t('common.back')}
              onPress={navigation.goBack}
            />
          )
        }
        center={<Text type="subtitle2">{title}</Text>}
        right={
          showClose && (
            <ActionButton
              label={t('common.close')}
              onPress={navigation.goBack}
            />
          )
        }
      />
    </Animated.View>
  );
}

export default ModalHeader;
