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
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/config': './src/config',
          '@/constants': './src/constants',
          '@/hooks': './src/hooks',
          '@/interfaces': './src/interfaces',
          '@/navigation': './src/navigation',
          '@/redux': './src/redux',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/utils': './src/utils',
          // Usefull aliases:
          '@/buttons': './src/components/buttons',
          '@/commonComponents': './src/components/common',
          '@/formatters': './src/components/formatters',
          '@/icons': './src/components/icons',
          '@/layout': './src/components/layout/index',
          '@/tokens': './src/components/tokens',
        },
      },
    ],
  ],
};
