import React from 'react';
import TokensIcon from './svg/TokensIcon';
import NFTsIcon from './svg/NFTsIcon';
import XTCIcon from './svg/XTCIcon';
import ICPIcon from './svg/ICPIcon';
import ArrowDownIcon from './svg/ArrowDownIcon';
import ChevronLeftIcon from './svg/ChevronLeftIcon';
import ChevronRightIcon from './svg/ChevronRightIcon';
import GearIcon from './svg/GearIcon';
import PlusIcon from './svg/PlusIcon';
import ActivityReceiveIcon from './svg/ActivityReceiveIcon';
import ActivitySendIcon from './svg/ActivitySendIcon';

const IconTypes = {
  activityReceive: ActivityReceiveIcon,
  activitySend: ActivitySendIcon,
  arrowDown: ArrowDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  gear: GearIcon,
  plus: PlusIcon,
  tokens: TokensIcon,
  nfts: NFTsIcon,
  dfinity: ICPIcon,
  xtc: XTCIcon,
};

const Icon = ({ name, color, ...props }) => {
  const IconElement = IconTypes[name];

  return <IconElement {...props} name={name} color={color} />;
};

export default Icon;
