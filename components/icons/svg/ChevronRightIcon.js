import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronRightIcon = ({ color = '#E1E8FD', ...props }) => (
  <Svg width="14" height="22" viewBox="0 0 14 22" {...props}>
    <Path
      d="M2.5 21.5C2.07812 21.5 1.70312 21.3594 1.42188 21.0781C0.8125 20.5156 0.8125 19.5312 1.42188 18.9688L9.34375 11L1.42188 3.07812C0.8125 2.51562 0.8125 1.53125 1.42188 0.96875C1.98438 0.359375 2.96875 0.359375 3.53125 0.96875L12.5312 9.96875C13.1406 10.5312 13.1406 11.5156 12.5312 12.0781L3.53125 21.0781C3.25 21.3594 2.875 21.5 2.5 21.5Z"
      fill={color}
    />
    <Path
      d="M1.42188 21.0781L1.49264 21.0074L1.4897 21.0046L1.42188 21.0781ZM1.42188 18.9688L1.48977 19.0423L1.49279 19.0393L1.42188 18.9688ZM9.34375 11L9.41467 11.0705L9.48496 10.9998L9.41446 10.9293L9.34375 11ZM1.42188 3.07812L1.49264 3.00736L1.4897 3.00464L1.42188 3.07812ZM1.42188 0.96875L1.48992 1.04247L1.49536 1.03658L1.42188 0.96875ZM3.53125 0.96875L3.45771 1.03663L3.46054 1.03946L3.53125 0.96875ZM12.5312 9.96875L12.4605 10.0395L12.4634 10.0422L12.5312 9.96875ZM12.5312 12.0781L12.4634 12.0046L12.4605 12.0074L12.5312 12.0781ZM2.5 21.4C2.10118 21.4 1.75277 21.2676 1.49259 21.0074L1.35116 21.1488C1.65348 21.4512 2.05507 21.6 2.5 21.6V21.4ZM1.4897 21.0046C0.923224 20.4817 0.923224 19.5651 1.4897 19.0422L1.35405 18.8953C0.701776 19.4974 0.701776 20.5495 1.35405 21.1516L1.4897 21.0046ZM1.49279 19.0393L9.41467 11.0705L9.27283 10.9295L1.35096 18.8982L1.49279 19.0393ZM9.41446 10.9293L1.49259 3.00741L1.35116 3.14884L9.27304 11.0707L9.41446 10.9293ZM1.4897 3.00464C0.923224 2.48174 0.923224 1.56513 1.4897 1.04223L1.35405 0.89527C0.701776 1.49737 0.701776 2.54951 1.35405 3.15161L1.4897 3.00464ZM1.49536 1.03658C2.01826 0.470099 2.93487 0.470099 3.45777 1.03658L3.60473 0.900922C3.00263 0.248651 1.95049 0.248651 1.34839 0.900922L1.49536 1.03658ZM3.46054 1.03946L12.4605 10.0395L12.602 9.89804L3.60196 0.898039L3.46054 1.03946ZM12.4634 10.0422C13.0299 10.5651 13.0299 11.4817 12.4634 12.0046L12.5991 12.1516C13.2513 11.5495 13.2513 10.4974 12.5991 9.89527L12.4634 10.0422ZM12.4605 12.0074L3.46054 21.0074L3.60196 21.1488L12.602 12.1488L12.4605 12.0074ZM3.46054 21.0074C3.19927 21.2687 2.85026 21.4 2.5 21.4V21.6C2.89974 21.6 3.30073 21.4501 3.60196 21.1488L3.46054 21.0074Z"
      fill={color}
    />
  </Svg>
);

export default ChevronRightIcon;
