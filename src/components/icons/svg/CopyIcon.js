import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CopyIcon = ({ color = '#3574F4', ...props }) => (
  <Svg width="17" height="17" viewBox="0 0 17 17" {...props}>
    <Path
      d="M4.75 12.25H2.875C1.83947 12.25 1 11.4105 1 10.375V2.875C1 1.83947 1.83947 1 2.875 1H10.375C11.4105 1 12.25 1.83947 12.25 2.875V4.75M6.625 16H14.125C15.1605 16 16 15.1605 16 14.125V6.625C16 5.58947 15.1605 4.75 14.125 4.75H6.625C5.58947 4.75 4.75 5.58947 4.75 6.625V14.125C4.75 15.1605 5.58947 16 6.625 16Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CopyIcon;
