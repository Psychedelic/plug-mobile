import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import ActionActivityIcon from './svg/ActivityAction.svg';
import BurnActivityIcon from './svg/ActivityBurn.svg';
import MintActivityIcon from './svg/ActivityMint.svg';
import ActivityReceiveIcon from './svg/ActivityReceive.svg';
import ActivitySendIcon from './svg/ActivitySend.svg';
import ArrowDownRoundedIcon from './svg/ArrowDownRounded.svg';
import ArrowRightIcon from './svg/ArrowRight.svg';
import ChevronIcon from './svg/Chevron.svg';
import ConnectDefaultIcon from './svg/ConnectDefault.svg';
import CopyIcon from './svg/Copy.svg';
import Error from './svg/Error.svg';
import EyeIcon from './svg/Eye.svg';
import EyeSlashIcon from './svg/EyeSlash.svg';
import FaceIdIcon from './svg/FaceId.svg';
import GearIcon from './svg/Gear.svg';
import ICPIcon from './svg/ICP.svg';
import InfoIcon from './svg/Info.svg';
import PlusIcon from './svg/Plus.svg';
import RedirectArrowIcon from './svg/RedirectArrow.svg';
import SwapArrowsIcon from './svg/SwapArrows.svg';
import TabNftsIcon from './svg/TabNfts.svg';
import TabProfileIcon from './svg/TabProfile.svg';
import TabTokensIcon from './svg/TabTokens.svg';
import ThreeDotsIcon from './svg/ThreeDots.svg';
import TransactionError from './svg/TransactionError.svg';
import TransactionSuccess from './svg/TransactionSuccess.svg';
import WICPIcon from './svg/WICP.svg';
import XTCIcon from './svg/XTC.svg';

export const IconTypes = (type: string) =>
  ({
    xtc: XTCIcon,
    wicp: WICPIcon,
    copy: CopyIcon,
    gear: GearIcon,
    plus: PlusIcon,
    dfinity: ICPIcon,
    profile: TabProfileIcon,
    tokens: TabTokensIcon,
    nfts: TabNftsIcon,
    error: Error,
    info: InfoIcon,
    transactionSuccess: TransactionSuccess,
    transactionError: TransactionError,
    faceIdIcon: FaceIdIcon,
    arrowRight: ArrowRightIcon,
    arrowDown: ArrowDownRoundedIcon,
    threeDots: ThreeDotsIcon,
    swapArrows: SwapArrowsIcon,
    activitySend: ActivitySendIcon,
    burnActivity: BurnActivityIcon,
    chevron: ChevronIcon,
    mintActivity: MintActivityIcon,
    connectIcon: ConnectDefaultIcon,
    redirectArrow: RedirectArrowIcon,
    activityReceive: ActivityReceiveIcon,
    actionActivity: ActionActivityIcon,
    eye: EyeIcon,
    eyeSlash: EyeSlashIcon,
  }[type]);

interface Props {
  name: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  height?: number;
}

const Icon = ({ name, color, ...props }: Props) => {
  const IconElement = IconTypes(name) as React.FunctionComponent<any>;
  return <IconElement {...props} name={name} color={color} fill={color} />;
};

export default Icon;
