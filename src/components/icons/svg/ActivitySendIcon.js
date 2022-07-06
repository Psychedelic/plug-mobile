import React from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

const ActivitySendIcon = ({ color, ...props }) => (
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
      d="M12.8205 5.1532L4.84885 9.75077C4.53755 9.92958 4.5771 10.3629 4.88668 10.4935L6.71492 11.2604L11.6562 6.90695C11.7508 6.8227 11.8849 6.95165 11.8041 7.04966L7.66086 12.096V13.4801C7.66086 13.8858 8.15103 14.0457 8.39181 13.7517L9.48394 12.4226L11.6269 13.3202C11.8711 13.4233 12.1498 13.2703 12.1945 13.0072L13.4328 5.5796C13.4913 5.23229 13.1181 4.98127 12.8205 5.1532Z"
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
        <Stop stopColor="#40BEE9" />
        <Stop offset="1" stopColor="#D06FD4" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear"
        x1="5.56086"
        y1="6.02449"
        x2="10.8901"
        y2="12.0489"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#40BEE9" />
        <Stop offset="1" stopColor="#CE71D5" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default ActivitySendIcon;
