module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // TODO: Delete the following line if is not being used anymore
    // '@babel/plugin-transform-exponentiation-operator',
    'transform-exponentiation-operator',
    'react-native-reanimated/plugin',
  ],
};
