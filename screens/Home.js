import React, { useEffect } from 'react';
import {  Text } from 'react-native';
import Button from '../components/buttons/Button';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/auth';
import LoaderHOC from '../helpers/LoaderHOC';
import Container from '../components/Container'

function Home({ setLoading }) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('home');
        setLoading(false);
    }, []);

    const onPress = () => {
        dispatch(login(false));
    }

    return (
        <Container>
            <Text>HOME</Text>
            <Button
                text='Logout'
                onPress={onPress}
                variant="rainbow"
            />
        </Container>
    );
}

export default LoaderHOC(Home, 'Verificando datos...');
