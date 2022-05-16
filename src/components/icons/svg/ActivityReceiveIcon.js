import React from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

const ActivityReceiveIcon = ({ color, ...props }) => (
  <Svg width="19" height="19" viewBox="0 0 19 19" {...props}>
    <Rect
      x="0.6"
      y="0.6"
      width="17.8"
      height="17.8"
      rx="8.9"
      fill="white"
      stroke="url(#paint0_linear)"
      stroke-width="1.2"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 13.375C5 13.0298 5.28782 12.75 5.64286 12.75H13.3571C13.7122 12.75 14 13.0298 14 13.375C14 13.7202 13.7122 14 13.3571 14H5.64286C5.28782 14 5 13.7202 5 13.375ZM7.11686 8.55806C7.36791 8.31398 7.77495 8.31398 8.026 8.55806L8.85714 9.36612L8.85714 4.625C8.85714 4.27982 9.14496 4 9.5 4C9.85504 4 10.1429 4.27982 10.1429 4.625L10.1429 9.36612L10.974 8.55806C11.2251 8.31398 11.6321 8.31398 11.8831 8.55806C12.1342 8.80214 12.1342 9.19786 11.8831 9.44194L9.95457 11.3169C9.83401 11.4342 9.6705 11.5 9.5 11.5C9.3295 11.5 9.16599 11.4342 9.04543 11.3169L7.11686 9.44194C6.86581 9.19786 6.86581 8.80214 7.11686 8.55806Z"
      fill="url(#paint1_linear)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear"
        x1="1.15854"
        y1="3.0122"
        x2="15.2927"
        y2="17.378"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FB63B9" />
        <Stop offset="1" stopColor="#F49C61" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear"
        x1="9.5"
        y1="4"
        x2="9.5"
        y2="14"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FB68B3" />
        <Stop offset="1" stopColor="#F59A65" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ActivityReceiveIcon;
