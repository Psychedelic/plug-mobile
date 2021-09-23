import React from 'react';
import { Colors } from '../../../constants/theme';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../../icons';

const icons = [
  <Icon name="tokens" />,
  <Icon name="nfts" />,
]

const getIcon = (index) => icons[index];

const BottomTabs = ({ state, descriptors, navigation }) => (
  <View style={styles.root}>
    {state.routes.map((route, index) => {

      const { options } = descriptors[route.key];
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate({ name: route.name, merge: true })
        }
      }

      return (
        <TouchableOpacity
          key={index}
          style={styles.tab}
          onPress={onPress}>
          <Text>
            <Icon name={index === 0 ? 'tokens' : 'nfts'} color={isFocused ? Colors.White.Primary : Colors.White.Secondary} />,
          </Text>
          <Text
            style={[
              isFocused ? styles.selected : styles.default,
              styles.text,
            ]}>
            {label}
          </Text>
        </TouchableOpacity>
      )
    })}
  </View>
);

export default BottomTabs;

const styles = StyleSheet.create({
  root: {
    height: 94,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Black.Primary,
  },
  tab: {
    width: 150,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  selected: {
    color: Colors.White.Primary,
  },
  default: {
    color: Colors.White.Secondary,
  },
});
