import React from 'react';
import Svg, { G, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const BurnActivityIcon = ({ color = '#6B7280', ...props }) => (
  <Svg width="51" height="51" viewBox="0 0 51 51" {...props}>
    <G filter="url(#filter0_ddd)">
      <Rect x="16" y="14" width="19" height="19" rx="9.5" fill="white" />
      <Rect x="16.6" y="14.6" width="17.8" height="17.8" rx="8.9" stroke="url(#paint0_linear)" stroke-width="1.2" />
    </G>
    <Path d="M26.0625 18.0859C26.0625 17.5234 25.3125 17.2891 25.0078 17.7578C22.7812 21.2266 25.6875 23.1016 25.6875 24.25C25.6875 24.7891 25.2656 25.1875 24.75 25.1875C24.2109 25.1875 23.8125 24.7891 23.8125 24.25V21.7891C23.8125 21.3203 23.2969 21.0625 22.9219 21.3203C21.7031 22.1641 21 23.5469 21 25C21 27.4844 23.0156 29.5 25.5 29.5C27.9609 29.5 30 27.4844 30 25C30 21.0156 26.0625 20.5 26.0625 18.0859ZM25.5 28.375C23.625 28.375 22.125 26.875 22.125 25C22.125 24.3438 22.3125 23.5 22.6875 22.9375V24.25C22.6875 25.3984 23.6016 26.3125 24.75 26.3125C25.875 26.3125 26.8125 25.3984 26.8125 24.25C26.8125 22.75 24.75 21.4375 25.3125 19.375C26.25 21.4375 28.875 22.2344 28.875 25C28.875 26.875 27.3516 28.375 25.5 28.375Z" fill="url(#paint1_linear)" />
    <Defs>
      
      <LinearGradient id="paint0_linear" x1="17.1585" y1="17.0122" x2="31.2927" y2="31.378" gradientUnits="userSpaceOnUse">
        <Stop stop-color="#FF954E" />
        <Stop offset="1" stop-color="#FF6600" />
      </LinearGradient>
      <LinearGradient id="paint1_linear" x1="22.5" y1="13.4375" x2="23.9726" y2="19.8188" gradientUnits="userSpaceOnUse">
        <Stop stop-color="#FF954E" />
        <Stop offset="1" stop-color="#FF6600" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default BurnActivityIcon;
