import React from 'react';
import TokensIcon from './svg/TokensIcon';
import NFTsIcon from './svg/NFTsIcon';
import XTCIcon from './svg/XTCIcon';
import ICPIcon from './svg/ICPIcon';
import ArrowDownIcon from './svg/ArrowDownIcon';
import PasswordEyeIcon from './svg/PasswordEyeIcon';
import ChevronLeftIcon from './svg/ChevronLeftIcon';
import ChevronRightIcon from './svg/ChevronRightIcon';
import GearIcon from './svg/GearIcon';
import PlusIcon from './svg/PlusIcon';
import ActivityReceiveIcon from './svg/ActivityReceiveIcon';
import ActivitySendIcon from './svg/ActivitySendIcon';
import CopyIcon from './svg/CopyIcon';
import SwapIcon from './svg/SwapIcon';
import SendIcon from './svg/SendIcon';
import DepositIcon from './svg/DepositIcon';
import GroupedActionsIcon from './svg/GroupedActionsIcon';
import SwapArrowsIcon from './svg/SwapArrowsIcon';
import ArrowDownAccountIcon from './svg/ArrowDownAccountIcon';
import ConfirmIcon from './svg/ConfirmIcon';
import ThreeDotsIcon from './svg/ThreeDotsIcon';
import UnknownIcon from './svg/UnknownIcon';
import LightingActivityIcon from './svg/LightingActivityIcon';
import BurnActivityIcon from './svg/BurnActivityIcon';
import MintActivityIcon from './svg/MintActivityIcon';
import PasswordEyeClosedIcon from './svg/PasswordEyeClosedIcon';
import FaceIdIcon from './svg/FaceIdIcon';

export const IconTypes = {
  faceIdIcon: FaceIdIcon,
  passwordEyeIcon: PasswordEyeIcon,
  passwordEyeClosedIcon: PasswordEyeClosedIcon,
  activityReceive: ActivityReceiveIcon,
  activitySend: ActivitySendIcon,
  arrowDown: ArrowDownIcon,
  arrowDownAccount: ArrowDownAccountIcon,
  burnActivity: BurnActivityIcon,
  confirm: ConfirmIcon,
  copy: CopyIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  deposit: DepositIcon,
  gear: GearIcon,
  groupedActions: GroupedActionsIcon,
  lightingActivity: LightingActivityIcon,
  mintActivity: MintActivityIcon,
  plus: PlusIcon,
  send: SendIcon,
  swap: SwapIcon,
  swapArrows: SwapArrowsIcon,
  tokens: TokensIcon,
  threeDots: ThreeDotsIcon,
  unknown: UnknownIcon,
  nfts: NFTsIcon,
  dfinity: ICPIcon,
  xtc: XTCIcon,
};

const Icon = ({ name, color, ...props }) => {
  const IconElement = IconTypes[name];
  return <IconElement {...props} name={name} color={color} />;
};

export default Icon;
