import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text, Touchable } from '@/components/common';
import Icon from '@/icons';
import animationScales from '@/utils/animationScales';

import styles from './styles';

interface Action {
  icon: string;
  onPress: () => void;
}

interface Props {
  text: string;
  colors: string[];
  actions: Action[];
}

function InfoWithActions({ text, colors, actions }: Props) {
  return (
    <LinearGradient
      colors={colors}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <View>
          {React.Children.toArray(
            actions.map(action => (
              <View style={styles.action}>
                <Touchable
                  onPress={action.onPress}
                  scale={animationScales.large}>
                  <Icon name={action.icon} color="white" />
                </Touchable>
              </View>
            ))
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

export default InfoWithActions;
