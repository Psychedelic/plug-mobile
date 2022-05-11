import React from 'react';
import Svg, {
  Defs,
  G,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

const DepositIcon = ({ color, ...props }) => (
  <Svg width="41" height="41" viewBox="0 0 41 41" {...props}>
    <Rect width="41" height="41" rx="20.5" fill="url(#paint0_radial)" />
    <G filter="url(#filter0_d)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 11C21.2495 11 21.8571 11.6076 21.8571 12.3571V19.1429H28.6429C29.3924 19.1429 30 19.7505 30 20.5C30 21.2495 29.3924 21.8571 28.6429 21.8571H21.8571V28.6429C21.8571 29.3924 21.2495 30 20.5 30C19.7505 30 19.1429 29.3924 19.1429 28.6429V21.8571H12.3571C11.6076 21.8571 11 21.2495 11 20.5C11 19.7505 11.6076 19.1429 12.3571 19.1429H19.1429V12.3571C19.1429 11.6076 19.7505 11 20.5 11Z"
        fill="white"
      />
      <Path
        d="M22.0571 12.3571C22.0571 11.4972 21.36 10.8 20.5 10.8C19.64 10.8 18.9429 11.4972 18.9429 12.3571V18.9429H12.3571C11.4972 18.9429 10.8 19.64 10.8 20.5C10.8 21.36 11.4972 22.0571 12.3571 22.0571H18.9429V28.6429C18.9429 29.5028 19.64 30.2 20.5 30.2C21.36 30.2 22.0571 29.5028 22.0571 28.6429V22.0571H28.6429C29.5028 22.0571 30.2 21.36 30.2 20.5C30.2 19.64 29.5028 18.9429 28.6429 18.9429H22.0571V12.3571Z"
        stroke="white"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        <Stop stopColor="#FFE701" />
        <Stop offset="0.48005" stopColor="#FA51D3" />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default DepositIcon;
