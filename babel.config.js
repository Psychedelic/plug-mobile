module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'transform-exponentiation-operator',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          // Core aliases:
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@helpers': './src/helpers',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          // Usefull aliases:
          '@commonComponents': './src/components/common',
        },
      },
    ],
  ],
};
