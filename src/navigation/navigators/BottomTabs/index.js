import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import Touchable from '../../../components/animations/Touchable';
import UserIcon from '../../../components/common/UserIcon';
import { Colors } from '../../../constants/theme';
import Icon from '../../../components/icons';
import styles from './styles';

const BottomTabs = ({ state, navigation }) => {
  const { currentWallet } = useSelector(store => store.keyring);
  return (
    <View style={styles.root}>
      {state.routes.map((route, index) => {
        const isProfile = index === 0;
        const isTokens = index === 1;
        const label = route.name;
        const isFocused = state.index === index;

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

        return isProfile ? (
          <View key={index} style={[styles.tab, styles.profileTab]}>
            <UserIcon icon={currentWallet?.icon} onPress={onPress} />
          </View>
        ) : (
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
