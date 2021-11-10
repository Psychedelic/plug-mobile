/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      // Polyfills for node libraries
      crypto: require.resolve('crypto-browserify'),
      assert: require.resolve('assert-browserify'),
      stream: require.resolve('readable-stream'),
      // events: require.resolve('events-browserify'),
    },
    sourceExts: ['jsx', 'js', 'ts', 'tsx'], //add here
  },
};
