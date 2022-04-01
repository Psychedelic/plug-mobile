import React from 'react';
import Svg, {
  Path,
  G,
  Rect,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';

const SendIcon = ({ color, ...props }) => (
  <Svg width="41" height="41" viewBox="0 0 41 41" {...props}>
    <Rect width="41" height="41" rx="20.5" fill="url(#paint0_radial)" />
    <G filter="url(#filter0_d)">
      <Path
        d="M27.6656 11.1199L10.4635 21.0409C9.79179 21.4268 9.87715 22.3617 10.5452 22.6437L14.4903 24.2985L25.153 14.9043C25.3571 14.7225 25.6466 15.0007 25.4722 15.2122L16.5316 26.1016V29.0883C16.5316 29.9639 17.5893 30.309 18.1089 29.6745L20.4656 26.8066L25.0899 28.7433C25.6169 28.9659 26.2182 28.6357 26.3147 28.068L28.9868 12.04C29.113 11.2905 28.3076 10.7488 27.6656 11.1199Z"
        fill="white"
      />
    </G>
    <Defs>
      <RadialGradient
        id="paint0_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20 20) rotate(50.7546) scale(45.8394 45.3264)">
        <Stop stopColor="#FA51D3" />
        <Stop offset="0.536371" stopColor="#10D9ED" />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default SendIcon;
