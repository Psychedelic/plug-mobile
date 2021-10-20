import React from 'react';
import { Colors } from '../../../constants/theme';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '../../../components/animations/Touchable';
import Icon from '../../../components/icons';

const BottomTabs = ({ state, navigation }) => (
  <View style={styles.root}>
    {state.routes.map((route, index) => {
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

      return (
        <Touchable onPress={onPress}>
          <View key={index} style={styles.tab}>
            <Text>
              <Icon
                name={!index ? 'tokens' : 'nfts'}
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
