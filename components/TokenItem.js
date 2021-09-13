import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import TokenIcon from './TokenIcon';

const TokenItem = ({ icon, name, amount, value, symbol }) => (
    <View style={styles.root}>
        <TokenIcon icon={icon} symbol={symbol}/>
        <View style={styles.leftContainer}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.amount}>{amount}</Text>
        </View>
        <Text style={[styles.text, styles.value]}>{value}</Text>
  </View>
)

export default TokenItem;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      },
      leftContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 10,
      },
      value: {
        marginLeft: 'auto',
        alignSelf: 'flex-start',
      },
      text:{
          color: '#E1E8FD',
          fontSize: 18
      },
      amount:{
          color: '#7A7E8B',
          fontSize: 18
      }
})