import React from 'react';
import Svg, { Path } from 'react-native-svg';

const RedirectArrowIcon = ({ color = '#3574F4', ...props }) => (
  <Svg width="11" height="11" viewBox="0 0 11 11" fill="none" {...props}>
    <Path
      fill={color}
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.60046 1.73345C3.56105 1.28301 3.89425 0.885912 4.3447 0.846504L8.9584 0.442859C9.40884 0.40345 9.80594 0.736658 9.84535 1.1871L10.249 5.8008C10.2884 6.25124 9.9552 6.64834 9.50476 6.68775C9.05432 6.72716 8.65721 6.39395 8.61781 5.94351L8.38643 3.29883L2.28933 10.5651C1.99868 10.9114 1.48228 10.9566 1.1359 10.666C0.789527 10.3753 0.744347 9.85893 1.03499 9.51255L7.13209 2.24632L4.48741 2.47769C4.03697 2.5171 3.63986 2.18389 3.60046 1.73345Z"
    />
  </Svg>
);

export default RedirectArrowIcon;
