import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import Touchable from '../../../components/animations/Touchable';
import { Colors } from '../../../constants/theme';
import Icon from '../../../components/icons';
import {
  setScrollOnProfile,
  setScrollOnNFTs,
} from '../../../redux/slices/user';
import styles from './styles';

const BottomTabs = ({ state, navigation }) => {
  const dispatch = useDispatch();
  const getTabStatus = index => ({
    isProfile: index === 0,
    isTokens: index === 1,
    isNFTs: index === 2,
    isFocused: state.index === index,
  });

  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const { isProfile, isTokens, isFocused, isNFTs } = getTabStatus(index);
        const iconName = isProfile ? 'profile' : isTokens ? 'tokens' : 'nfts';
        const iconSize = '20';
        const label = isNFTs ? 'Collectibles' : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }

          // Tap to scroll to top feature:
          if (isFocused && !isTokens) {
            const actionToDispatch = isProfile
              ? setScrollOnProfile
              : setScrollOnNFTs;
            dispatch(actionToDispatch(true));
            setTimeout(() => {
              dispatch(actionToDispatch(false));
            }, 1000);
          }
        };

        return (
          <Touchable onPress={onPress} key={route.name}>
            <View key={index} style={styles.tab}>
              <Icon
                name={iconName}
                width={iconSize}
                height={iconSize}
                color={
                  isFocused ? Colors.White.Primary : Colors.White.Secondary
                }
              />
              <Text
                style={[
                  isFocused ? styles.selected : styles.default,
                  styles.text,
                ]}>
                {label}
              </Text>
            </View>
          </Touchable>
        );
      })}
    </View>
  );
};

export default BottomTabs;
