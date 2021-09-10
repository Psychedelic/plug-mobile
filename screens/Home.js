import React from 'react';
import { Text } from 'react-native';
import Button from '../components/buttons/Button';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/auth';
import Container from '../components/Container';

function Home() {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(login(false));
  };

  return (
    <Container>
      <Text>HOME</Text>
      <Button text="Logout" onPress={onPress} variant="rainbow" />
    </Container>
  );
}

export default Home;
