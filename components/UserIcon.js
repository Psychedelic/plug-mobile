import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Rainbow } from '../constants/theme';

const UserIcon = ({ size, icon }) => (
    <LinearGradient
        style={[styles.circle, styles[size]]}
        {...Rainbow}
    >
        <View style={[styles.background, styles['background' + size]]}>
            <Text style={styles['text' + size]}>{icon}</Text>
        </View>
    </LinearGradient >
)

export default UserIcon;

const styles = StyleSheet.create({
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    big: {
        width: 48,
        height: 48,
    },
    medium: {
        width: 40,
        height: 40,
    },
    small: {
        width: 34,
        height: 34,
    },
    textbig: {
        fontSize: 32,
    },
    textmedium: {
        fontSize: 24,
    },
    textsmall: {
        fontSize: 18,
    },
    background: {
        borderRadius: 100,
        backgroundColor: Colors.Black.Primary,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backgroundbig: {
        width: 43,
        height: 43,
    },
    backgroundmedium: {
        width: 36,
        height: 36,
    },
    backgroundsmall: {
        width: 30,
        height: 30,
    },
})