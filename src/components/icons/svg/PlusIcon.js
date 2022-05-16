import React from 'react';
import Svg, { Defs, Path, RadialGradient, Stop } from 'react-native-svg';

const PlusIcon = ({ color, ...props }) => (
  <Svg width="22" height="22" viewBox="0 0 22 22" {...props}>
    <Path
      d="M11 0.09375C5.11328 0.09375 0.34375 4.86328 0.34375 10.75C0.34375 16.6367 5.11328 21.4062 11 21.4062C16.8867 21.4062 21.6562 16.6367 21.6562 10.75C21.6562 4.86328 16.8867 0.09375 11 0.09375ZM17.1875 11.9531C17.1875 12.2539 16.9297 12.4688 16.6719 12.4688H12.7188V16.4219C12.7188 16.7227 12.4609 16.9375 12.2031 16.9375H9.79688C9.49609 16.9375 9.28125 16.7227 9.28125 16.4219V12.4688H5.32812C5.02734 12.4688 4.8125 12.2539 4.8125 11.9531V9.54688C4.8125 9.28906 5.02734 9.03125 5.32812 9.03125H9.28125V5.07812C9.28125 4.82031 9.49609 4.5625 9.79688 4.5625H12.2031C12.4609 4.5625 12.7188 4.82031 12.7188 5.07812V9.03125H16.6719C16.9297 9.03125 17.1875 9.28906 17.1875 9.54688V11.9531Z"
      fill="url(#paint0_radial_3447:3141)"
    />
    <Defs>
      <RadialGradient
        id="paint0_radial_3447:3141"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(11 11) rotate(90) scale(11)">
        <Stop offset="0.427083" stopColor="#04CCD6" />
        <Stop offset="1" stopColor="#2FF288" />
      </RadialGradient>
    </Defs>
  </Svg>
);

export default PlusIcon;
