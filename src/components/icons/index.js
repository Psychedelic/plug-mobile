import React from 'react';

import ActivityReceiveIcon from './svg/ActivityReceiveIcon';
import ActivitySendIcon from './svg/ActivitySendIcon';
import ArrowDownAccountIcon from './svg/ArrowDownAccountIcon';
import ArrowDownIcon from './svg/ArrowDownIcon';
import ArrowRightIcon from './svg/ArrowRightIcon';
import BurnActivityIcon from './svg/BurnActivityIcon';
import ChevronLeftIcon from './svg/ChevronLeftIcon';
import ChevronRightIcon from './svg/ChevronRightIcon';
import ConfirmIcon from './svg/ConfirmIcon';
import CopyIcon from './svg/CopyIcon';
import DepositIcon from './svg/DepositIcon';
import DiscordIcon from './svg/DiscordIcon';
import ErrorIcon from './svg/ErrorIcon';
import FaceIdIcon from './svg/FaceIdIcon';
import GearIcon from './svg/GearIcon';
import GroupedActionsIcon from './svg/GroupedActionsIcon';
import ICPIcon from './svg/ICPIcon';
import LightingActivityIcon from './svg/LightingActivityIcon';
import MintActivityIcon from './svg/MintActivityIcon';
import NFTsIcon from './svg/NFTsIcon';
import PasswordEyeClosedIcon from './svg/PasswordEyeClosedIcon';
import PasswordEyeIcon from './svg/PasswordEyeIcon';
import PlusIcon from './svg/PlusIcon';
import ProfileIcon from './svg/ProfileIcon';
import SendIcon from './svg/SendIcon';
import SwapArrowsIcon from './svg/SwapArrowsIcon';
import SwapIcon from './svg/SwapIcon';
import ThreeDotsIcon from './svg/ThreeDotsIcon';
import TokensIcon from './svg/TokensIcon';
import UnknownIcon from './svg/UnknownIcon';
import WICPIcon from './svg/WICPIcon';
import XTCIcon from './svg/XTCIcon';

export const IconTypes = {
  xtc: XTCIcon,
  nfts: NFTsIcon,
  wicp: WICPIcon,
  copy: CopyIcon,
  gear: GearIcon,
  plus: PlusIcon,
  send: SendIcon,
  swap: SwapIcon,
  error: ErrorIcon,
  dfinity: ICPIcon,
  tokens: TokensIcon,
  profile: ProfileIcon,
  unknown: UnknownIcon,
  confirm: ConfirmIcon,
  deposit: DepositIcon,
  discord: DiscordIcon,
  faceIdIcon: FaceIdIcon,
  arrowRight: ArrowRightIcon,
  arrowDown: ArrowDownIcon,
  threeDots: ThreeDotsIcon,
  swapArrows: SwapArrowsIcon,
  chevronLeft: ChevronLeftIcon,
  activitySend: ActivitySendIcon,
  burnActivity: BurnActivityIcon,
  chevronRight: ChevronRightIcon,
  mintActivity: MintActivityIcon,
  passwordEyeIcon: PasswordEyeIcon,
  groupedActions: GroupedActionsIcon,
  activityReceive: ActivityReceiveIcon,
  arrowDownAccount: ArrowDownAccountIcon,
  lightingActivity: LightingActivityIcon,
  passwordEyeClosedIcon: PasswordEyeClosedIcon,
};

const Icon = ({ name, color, ...props }) => {
  const IconElement = IconTypes[name];
  return <IconElement {...props} name={name} color={color} />;
};

export default Icon;
