import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const ArrowDownSecondaryIcon = ({ ...props }) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" {...props}>
    <Path
      d="M16.0788 10.5877C16.4034 10.2631 16.4034 9.73683 16.0788 9.41222C15.7544 9.08781 15.2285 9.08757 14.9038 9.41169L10.8333 13.475V4.16665C10.8333 3.70641 10.4602 3.33331 9.99992 3.33331C9.53968 3.33331 9.16658 3.70641 9.16658 4.16665V13.475L5.10799 9.40911C4.78145 9.08199 4.25148 9.08175 3.92465 9.40858C3.59803 9.7352 3.59803 10.2648 3.92465 10.5914L9.39386 16.0606C9.72858 16.3953 10.2713 16.3953 10.606 16.0606L16.0788 10.5877Z"
      fill="url(#paint0_linear_9062_6100)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_9062_6100"
        x1="4.70214"
        y1="4.13868"
        x2="14.7008"
        y2="8.57012"
        gradientUnits="userSpaceOnUse">
        <Stop stop-color="#DEF9FF" />
        <Stop offset="1" stop-color="#FFDFFC" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ArrowDownSecondaryIcon;
