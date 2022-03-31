![Android_Feature_Image (22)](https://user-images.githubusercontent.com/73345016/160957212-31555bb1-26b8-4d76-81fa-1f5a64f55a1b.png)

# Plug - Mobile App!

[![Fleek](https://img.shields.io/badge/Made%20by-Fleek-blue)](https://fleek.co/)
[![Discord](https://img.shields.io/badge/Discord-Channel-blue)](https://discord.gg/yVEcEzmrgm)

Welcome to the mobile app repository for Plug! An [Internet Computer](https://dfinity.org/) crypto wallet and authentication provider. Find our latest version of our mobile app in this repository's releases, or on our [website](https://plugwallet.ooo/). You can go to our [documentation](https://docs.plugwallet.ooo/) to learn more about how to interact with Plug as a developer.

## V0.1.0 - iOS Release!

V0.1.0 of Plug for iOS is the initial release of this mobile application, compatible with **iOS devices using iOS 15 or above**.

### Features Included in this Release ✅

- Holding & sending ICP, XTC; WICP
- Holding & sending NFTs (any listed in DAB)
- Saving and using contacts in an address book
- Viewing transactions in the activity tab
- FaceID integration

### Features Not Included (But Coming Next!) ⌛

- Adding custom tokens and transferring them
- Connecting to apps from the mobile extension
- Viewing your transactions in the CAP Explorer
- ICNS support (.icp name resolving)

# Building Locally

The code is built using React-Native and running code locally requires a Mac or Linux OS.

- Install [sentry-cli](https://github.com/getsentry/sentry-cli) tools: `brew install getsentry/tools/sentry-cli`

- Install [Node.js](https://nodejs.org) **version 14 (latest stable) and yarn@1 (latest)**

  - If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.

- Install the shared [React Native dependencies](https://reactnative.dev/docs/environment-setup#installing-dependencies) (`React Native CLI`, _not_ `Expo CLI`)

- Install [cocoapods](https://guides.cocoapods.org/using/getting-started.html) by running:

```bash
sudo gem install cocoapods
```

- Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- [Check this link if you are having troubles with the command](https://www.rust-lang.org/tools/install)

- Clone this repo and install our dependencies:

```bash
git clone ...
cd plug-mobile
yarn install
cd ios && pod install && cd .. # install pods for iOS
```

### iOS

- Install the iOS dependencies
  - [React Native Getting Started - iOS](https://reactnative.dev/docs/environment-setup#installing-dependencies) _(React Native CLI Quickstart -> [your OS] -> iOS)_
    - You do **not** need CocoaPods

```bash
yarn ios
```

### Support

If you're experiencing any troubles with the setup guide you can share your issues in our [Discord](https://discord.gg/yVEcEzmrgm) at **#plug-mobile**
