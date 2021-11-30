import React from 'react';
import Svg, { G, Rect, Path, Defs, LinearGradient, Stop, } from 'react-native-svg';

const LightingActivityIcon = ({ color = 'black', ...props }) => (
  <Svg width="51" height="51" viewBox="0 0 51 51" {...props}>
    <G filter="url(#filter0_ddd)">
      <Rect x="16" y="14" width="19" height="19" rx="9.5" fill="white" />
      <Rect x="16.6" y="14.6" width="17.8" height="17.8" rx="8.9" stroke="url(#paint0_linear)" strokeWidth="1.2" />
    </G>
    <Path d="M28.5566 24.0644L24.0742 27.9844C23.9512 28.0898 23.8106 28.125 23.6875 28.125C23.5645 28.125 23.4414 28.0898 23.3535 28.0195C23.1426 27.8789 23.0547 27.5977 23.1602 27.3516L24.5137 24.1875H22.5625C22.3164 24.1875 22.1055 24.0469 22.0352 23.8359C21.9473 23.6074 22 23.3613 22.1758 23.2031L26.6758 19.2832C26.8691 19.1074 27.1504 19.1074 27.3613 19.2656C27.5898 19.4062 27.6602 19.6875 27.5547 19.9336L26.2012 23.0801H28.1699C28.3984 23.0801 28.6094 23.2383 28.6973 23.4492C28.7852 23.6602 28.7324 23.9062 28.5566 24.0644Z" fill="url(#paint1_linear)" />
    <Defs>

      <LinearGradient id="paint0_linear" x1="17.5" y1="16.5" x2="33" y2="30.5" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFEF5E" />
        <Stop offset="1" stopColor="#FF9518" />
      </LinearGradient>
      <LinearGradient id="paint1_linear" x1="22.5" y1="20" x2="29" y2="28" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFEA5A" />
        <Stop offset="1" stopColor="#FF9A1C" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default LightingActivityIcon;
