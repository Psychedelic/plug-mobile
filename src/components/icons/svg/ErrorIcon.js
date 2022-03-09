import React from 'react';
import Svg, { Path, Defs, RadialGradient, Stop } from 'react-native-svg';

const ConfirmIcon = ({ ...props }) => (
  <Svg width="64" height="64" viewBox="0 0 64 64" {...props}>
    <Path
      d="M32 0C14.25 0 0 14.375 0 32C0 49.75 14.25 64 32 64C49.625 64 64 49.75 64 32C64 14.375 49.625 0 32 0ZM29 19C29 17.375 30.25 16 32 16C33.625 16 35 17.375 35 19V35C35 36.75 33.625 38 32 38C30.25 38 29 36.75 29 35V19ZM32 50C29.75 50 28 48.25 28 46.125C28 44 29.75 42.25 32 42.25C34.125 42.25 35.875 44 35.875 46.125C35.875 48.25 34.125 50 32 50Z"
      fill="url(#paint0_radial_6058_1710)"
    />
    <Defs>
      <RadialGradient
        id="paint0_radial_6058_1710"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(32 32) rotate(90) scale(32)">
        <Stop offset="0.427083" stopColor="#FF7E7E" />
        <Stop offset="1" stopColor="#FF3232" />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default ConfirmIcon;
