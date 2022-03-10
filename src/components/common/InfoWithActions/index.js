import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import animationScales from '../../../utils/animationScales';
import Touchable from '../../animations/Touchable';
import Icon from '../../icons';
import styles from './styles';

const InfoWithActions = ({ text, colors, actions }) => {
  return (
    <LinearGradient
      colors={colors}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.actionsContainer}>
          {actions.map(action => (
            <View style={styles.action}>
              <Touchable onPress={action.onPress} scale={animationScales.large}>
                <Icon name={action.icon} color="white" />
              </Touchable>
            </View>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

export default InfoWithActions;
