import React from 'react';
import { View, Text } from 'react-native';

import Touchable from '../../../components/animations/Touchable';
import { Colors } from '../../../constants/theme';
import Icon from '../../../components/icons';
import styles from './styles';

const BottomTabs = ({ state, navigation }) => {
  const getTabStatus = index => ({
    isProfile: index === 0,
    isTokens: index === 1,
    isNFTs: index === 2,
    isFocused: state.index === index,
  });

  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const { isProfile, isTokens, isFocused } = getTabStatus(index);
        const label = route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <Touchable onPress={onPress} key={route.name}>
            <View key={index} style={styles.tab}>
              <Text>
                <Icon
                  name={isProfile ? 'profile' : isTokens ? 'tokens' : 'nfts'}
                  color={
                    isFocused ? Colors.White.Primary : Colors.White.Secondary
                  }
                />
                ,
              </Text>
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
