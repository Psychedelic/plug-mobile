import React from 'react';
import Svg, { G, Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const BurnActivityIcon = ({ color = '#6B7280', ...props }) => (
  <Svg width="19" height="19" viewBox="0 0 19 19" {...props}>
    <Rect x="0.6" y="0.6" width="17.8" height="17.8" rx="8.9" fill="white" stroke="url(#paint0_linear_4235_1838)" stroke-width="1.2" />
    <Path d="M12.75 10.75C12.75 12.6133 11.2207 14.125 9.375 14.125C7.51172 14.125 6 12.6133 6 10.75C6 9.73046 6.47461 8.88671 6.94922 8.39452C7.21289 8.11327 7.6875 8.28906 7.6875 8.67577V10.1699C7.6875 10.8027 8.16211 11.3125 8.79492 11.3125C9.41016 11.3301 9.9375 10.8203 9.9375 10.1875C9.9375 8.64062 6.84375 8.49999 9.00586 5.31835C9.25195 4.98437 9.79688 5.14257 9.79688 5.54687C9.7793 7.35741 12.75 7.76171 12.75 10.75Z" fill="url(#paint1_linear_4235_1838)" />
    <Defs>
      <LinearGradient id="paint0_linear_4235_1838" x1="1.5" y1="2.5" x2="17" y2="16.5" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FF9999" />
        <Stop offset="1" stopColor="#FF2F2F" />
      </LinearGradient>
      <LinearGradient id="paint1_linear_4235_1838" x1="6.5" y1="6" x2="13" y2="14" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FF9999" />
        <Stop offset="1" stopColor="#FF2F2F" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default BurnActivityIcon;
