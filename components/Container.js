import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';

const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </SafeAreaView>
    </View>
)

const Container = ({ children }) => {
    return (
        <View style={styles.container}>
            <MyStatusBar
                barStyle="light-content"
                backgroundColor='black'
            />
            <View style={styles.outerContainer} />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    )
}

export default Container;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    outerContainer: {
        backgroundColor: 'black',
        flex: 1,
        position: 'absolute',
        top: 0, bottom: 0, right: 0, left: 0,
    },
    content: {
        flex: 1,
        backgroundColor: '#15161C',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 24
    }
})