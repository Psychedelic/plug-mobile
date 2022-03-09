import React from 'react';
import Svg, { Path, Defs, RadialGradient, Stop } from 'react-native-svg';

const ConfirmIcon = ({ ...props }) => (
  <Svg width="64" height="64" viewBox="0 0 64 64" {...props}>
    <Path
      d="M62 31C62 14 48 0 31 0C13.875 0 0 14 0 31C0 48.125 13.875 62 31 62C48 62 62 48.125 62 31ZM27.375 47.5C26.625 48.25 25.25 48.25 24.5 47.5L11.5 34.5C10.75 33.75 10.75 32.375 11.5 31.625L14.375 28.875C15.125 28 16.375 28 17.125 28.875L26 37.625L44.75 18.875C45.5 18 46.75 18 47.5 18.875L50.375 21.625C51.125 22.375 51.125 23.75 50.375 24.5L27.375 47.5Z"
      fill="url(#paint0_radial_3231:3099)"
    />
    <Defs>
      <RadialGradient
        id="paint0_radial_3231:3099"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(30.0976 30.1463) rotate(49.1867) scale(80.0823 79.9495)">
        <Stop stopColor="#00E8FF" />
        <Stop offset="0.671875" stopColor="#47F748" />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default ConfirmIcon;
