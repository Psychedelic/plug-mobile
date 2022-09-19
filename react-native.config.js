module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
  dependency: {
    platforms: {
      ios: {},
      android: {
        packageInstance: 'new RNSentryPackage()',
      },
    },
  },
};
