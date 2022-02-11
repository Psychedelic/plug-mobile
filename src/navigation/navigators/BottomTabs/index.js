import React from 'react';
import { View, Text } from 'react-native';

import Touchable from '../../../components/animations/Touchable';
import { Colors } from '../../../constants/theme';
import Icon from '../../../components/icons';
import styles from './styles';

const BottomTabs = ({ state, navigation }) => {
  const tabs = state.routes?.slice(1);

  return (
    <View style={styles.root}>
      {tabs.map((route, index) => {
        const isTokens = index === 0;
        const label = route.name;
        const isFocused = state.index === index + 1;

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
                  name={isTokens ? 'tokens' : 'nfts'}
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
