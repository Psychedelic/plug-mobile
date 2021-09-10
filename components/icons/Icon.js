import React from 'react';
import TokensIcon from './svg/TokensIcon';
import NFTsIcon from './svg/NFTsIcon';

const IconTypes = {
    tokens: TokensIcon,
    nfts: NFTsIcon,
};

const Icon = ({ name, color, ...props }) => {
    const IconElement = IconTypes[name];

    return (
        <IconElement
            {...props}
            name={name}
            color={color}
        />
    )
}

export default Icon;