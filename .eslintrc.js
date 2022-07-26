module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['simple-import-sort'],
  ignorePatterns: ['NDK'],
  rules: {
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 0,
    'simple-import-sort/imports': 'error',
  },
  globals: {
    BigInt: true,
  },
};
