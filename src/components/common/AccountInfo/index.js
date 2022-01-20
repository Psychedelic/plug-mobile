import React, { useRef, useState, useEffect } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { View, Text, Animated } from 'react-native';
import { useSelector } from 'react-redux';

import shortAddress from '../../../helpers/short-address';
import { FontStyles } from '../../../constants/theme';
import Touchable from '../../animations/Touchable';
import styles from './styles';

const TOAST_DURATION = 2500;
const TOAST_ANIMATION_SPEED = 200;

const AccountInfo = () => {
  const [visibility, setVisibility] = useState(false);
  const { currentWallet } = useSelector(state => state.keyring);
  const { principal, name } = currentWallet || {};
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    setVisibility(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: TOAST_ANIMATION_SPEED,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: TOAST_ANIMATION_SPEED,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished) {
            setVisibility(false);
          }
        });
      }, TOAST_DURATION);
    });
  };

  const copyToClipboard = async () => {
    Clipboard.setString(principal);
    startAnimation();
  };

  useEffect(() => {
    return () => setVisibility(false);
  }, []);

  return (
    <>
      <Touchable onPress={copyToClipboard}>
        <View style={styles.container}>
          <Text style={FontStyles.Normal}>{name}</Text>
          <Text style={FontStyles.SmallGray}>{shortAddress(principal)}</Text>
        </View>
      </Touchable>
      {visibility && (
        <Animated.View
          style={[
            styles.animationContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <View style={styles.pointer} />
          <Text style={[FontStyles.Small, styles.text]}>Copied!</Text>
        </Animated.View>
      )}
    </>
  );
};

export default AccountInfo;
