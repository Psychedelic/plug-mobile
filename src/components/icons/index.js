import React from 'react';

import PasswordEyeClosedIcon from './svg/PasswordEyeClosedIcon';
import LightingActivityIcon from './svg/LightingActivityIcon';
import ArrowDownAccountIcon from './svg/ArrowDownAccountIcon';
import ActivityReceiveIcon from './svg/ActivityReceiveIcon';
import GroupedActionsIcon from './svg/GroupedActionsIcon';
import ChevronRightIcon from './svg/ChevronRightIcon';
import ActivitySendIcon from './svg/ActivitySendIcon';
import BurnActivityIcon from './svg/BurnActivityIcon';
import MintActivityIcon from './svg/MintActivityIcon';
import PasswordEyeIcon from './svg/PasswordEyeIcon';
import ChevronLeftIcon from './svg/ChevronLeftIcon';
import SwapArrowsIcon from './svg/SwapArrowsIcon';
import ArrowRightIcon from './svg/ArrowRightIcon';
import ThreeDotsIcon from './svg/ThreeDotsIcon';
import ArrowDownIcon from './svg/ArrowDownIcon';
import DepositIcon from './svg/DepositIcon';
import ConfirmIcon from './svg/ConfirmIcon';
import UnknownIcon from './svg/UnknownIcon';
import ProfileIcon from './svg/ProfileIcon';
import DiscordIcon from './svg/DiscordIcon';
import FaceIdIcon from './svg/FaceIdIcon';
import TokensIcon from './svg/TokensIcon';
import ErrorIcon from './svg/ErrorIcon';
import NFTsIcon from './svg/NFTsIcon';
import GearIcon from './svg/GearIcon';
import PlusIcon from './svg/PlusIcon';
import CopyIcon from './svg/CopyIcon';
import SwapIcon from './svg/SwapIcon';
import SendIcon from './svg/SendIcon';
import WICPIcon from './svg/WICPIcon';
import XTCIcon from './svg/XTCIcon';
import ICPIcon from './svg/ICPIcon';

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
