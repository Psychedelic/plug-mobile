import React, { useState } from 'react';
import { Text } from 'react-native';
import Button from '../components/buttons/Button';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/auth';
import Container from '../components/Container'
import BottomNavigator from '../components/BottomNavigator';
import { Icon } from '../components/icons';

const TABS = (selected) => [
    {
        icon: <Icon name='tokens' color={selected === 0 ? 'white' : 'gray'} />,
        text: 'Tokens'
    },
    {
        icon: <Icon name='nfts' color={selected === 1 ? 'white' : 'gray'} />,
        text: 'NFTs'
    }
]

function Home() {
    const dispatch = useDispatch();

    const onPress = () => {
        dispatch(login(false));
    }

    const [selectedTab, setSelectedTab] = useState(0);

    const onSelect = (value) => setSelectedTab(value);

    const tabs = TABS(selectedTab);
    console.log(tabs);

    return (
        <Container>
            <Text>HOME</Text>
            <Button
                text='Logout'
                onPress={onPress}
                variant="rainbow"
            />
            <BottomNavigator
                tabs={tabs}
                selected={selectedTab}
                onSelect={onSelect}
            />
        </Container>
    );
}

export default Home;
