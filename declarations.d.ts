declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'react-native-fetch-api';
declare module 'react-native-crypto-js';
declare module 'emoji-datasource';
declare module 'mime-types';
