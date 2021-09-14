import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BottomNavigator = ({ tabs, selected, onSelect }) => (
  <View style={styles.root}>
    {tabs.map((tab, index) => (
      <TouchableOpacity style={styles.tab} onPress={() => onSelect(index)}>
        {tab.icon}
        <Text
          style={[
            index === selected ? styles.selected : styles.default,
            styles.text,
          ]}>
          {tab.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default BottomNavigator;

const styles = StyleSheet.create({
  root: {
    height: 94,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    width: 150,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  selected: {
    color: '#E1E8FD',
  },
  default: {
    color: '#7A7E8B',
  },
});
