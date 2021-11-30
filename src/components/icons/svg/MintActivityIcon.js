import React from 'react';
import Svg, { G, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const MintActivityIcon = ({ color = '#6B7280', ...props }) => (
  <Svg width="51" height="51" viewBox="0 0 51 51" {...props}>
    <G filter="url(#filter0_ddd)">
      <Rect x="16" y="14" width="19" height="19" rx="9.5" fill="white" />
      <Rect x="16.6" y="14.6" width="17.8" height="17.8" rx="8.9" stroke="url(#paint0_linear)" stroke-width="1.2" />
    </G>
    <Path d="M22.125 20.8125H21C21 22.9746 22.7578 24.75 24.9375 24.75V27C24.9375 27.3164 25.1836 27.5625 25.4824 27.5625C25.7637 27.5625 26.0625 27.3164 26.0625 27V24.75C26.0625 22.5879 24.2871 20.8125 22.125 20.8125ZM28.875 19.6875C27.3809 19.6875 26.0977 20.5137 25.4297 21.7266C25.9043 22.2539 26.2734 22.9043 26.4668 23.6074C28.4531 23.4141 30 21.7266 30 19.6875H28.875Z" fill="url(#paint1_linear)" />
    <Defs>
     
      <LinearGradient id="paint0_linear" x1="17.1585" y1="17.0122" x2="31.2927" y2="31.378" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#00E8FF" />
        <Stop offset="1" stopColor="#47F648" />
      </LinearGradient>
      <LinearGradient id="paint1_linear" x1="21.9474" y1="19.9474" x2="27.3947" y2="26.1053" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#05E9F5" />
        <Stop offset="1" stopColor="#46F64C" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default MintActivityIcon;
