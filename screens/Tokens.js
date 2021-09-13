import React from 'react';
import { View } from 'react-native';
import TokenItem from '../components/TokenItem';
import { Icon } from '../components/icons';

const TOKENS = [
    {
        symbol: 'ICP',
        name: 'ICP',
        amount: 152.28,
        value: 12183.29,
        icon: <Icon name='icp' />
    },
    {
        symbol: 'Cycles',
        name: 'XTC',
        amount: 102.2913,
        value: 102.30,
        icon: <Icon name='xtc' />
    },
]

const Tokens = () => {
    return (
        <View>
            {
                TOKENS.map(token => (
                    <TokenItem {...token} />
                ))
            }
        </View>
    )
}

export default Tokens;