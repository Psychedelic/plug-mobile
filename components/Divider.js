import React from 'react';
import { StyleSheet, View } from 'react-native';

const Divider = ({ color = '#23242A', style }) => (
    <View style={[styles.root, { backgroundColor: color }, style]} />
)

export default Divider;

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 1,
        alignSelf: 'center',
    },
})