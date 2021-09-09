import React, { useEffect } from 'react';
import { View, SafeAreaView, StatusBar, Text, Image} from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/auth';
import Button from '../components/buttons/Button';

function Welcome() {
    const dispatch = useDispatch();

    const onPress = () => {
        dispatch(login(true));
    }

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="light-content" />

            <View style={styles.container}>

                <Image source={require('../assets/icons/plug-white.png')} />
                

                <Text style={styles.title}>Welcome to Plug</Text>

                <Button
                    customStyle={{ marginTop: 24 }}
                    text='Create Wallet'
                    onPress={onPress}
                    variant="rainbow"
                />

                <Button
                    customStyle={{ marginTop: 24 }}
                    text='Import Wallet'
                    onPress={onPress}
                    variant="gray"
                />
            </View>

        </SafeAreaView>
    );
}

export default Welcome;


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#15161C',
        justifyContent: 'center'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        padding: 24,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#E1E8FD',
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 28
    },
});
