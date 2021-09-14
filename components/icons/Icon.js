import React from 'react';
import TokensIcon from './svg/TokensIcon';
import NFTsIcon from './svg/NFTsIcon';
import XTCIcon from './svg/XTCIcon';
import ICPIcon from './svg/ICPIcon';

const IconTypes = {
  tokens: TokensIcon,
  nfts: NFTsIcon,
  icp: ICPIcon,
  xtc: XTCIcon,
};

const Icon = ({ name, color, ...props }) => {
  const IconElement = IconTypes[name];

  return <IconElement {...props} name={name} color={color} />;
};

export default Icon;
