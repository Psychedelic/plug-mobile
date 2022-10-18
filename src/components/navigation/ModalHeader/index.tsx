import { StackHeaderProps } from '@react-navigation/stack';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';

import { ActionButton, Header, Text } from '@/components/common';
import { getRouteName } from '@/navigation/utils';

import styles from './styles';

interface Props extends StackHeaderProps {
  showBack?: boolean;
  showClose?: boolean;
}

function ModalHeader({ navigation, route, showBack, showClose }: Props) {
  const title = getRouteName(route.name);
  return (
    <View style={styles.container}>
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
    </View>
  );
}

export default ModalHeader;
