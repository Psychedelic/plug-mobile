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

The code is built using React-Native and running code locally requires a Mac.

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

  And choose option 1 (proceed with installation (default))

- [Check this link if you are having troubles with the command](https://www.rust-lang.org/tools/install)

- Clone this repo:

  ```bash
  git clone repo-url
  ```

- Follow the installation steps on our controller package called [plug-mobile-controller](https://github.com/Psychedelic/plug-mobile-controller).

- Install our dependencies:

```bash
  cd plug-mobile
  yarn install
  cd ios && pod install && cd .. # install pods for iOS
```

- Choose the toolchain and install rust dependencies following the nexts steps:

  ```bash
  $ cargo install cargo-lipo
  $ rustup default 1.55.0-x86_64-apple-darwin
  $ rustup target add aarch64-apple-ios x86_64-apple-ios
  $ rustup target add aarch64-linux-android
  $ rustup target add armv7-linux-androideabi
  $ rustup target add i686-linux-android
  ```

- [Download NDK from Android Studio](https://developer.android.com/studio/projects/install-ndk), if you have M1 download the version `24.0.8215888`.
- Install android-ndk:

```bash
brew install android-ndk
```

- Set in `local.properties` the NDK path like this:
  `ndk.dir=/Users/your-user-name/Library/Android/sdk/ndk-bundle` or like this `ndk.dir=/Users/your-user-name/Library/Android/sdk/ndk/24.0.8215888`.
- Set `$NDK_HOME` in enviroment:

```bash
export NDK_HOME="/usr/local/share/android-ndk"
```

- Run `sh ./create-ndk-standalone.sh` on project's root to create the `config.toml` file.
- You might need to install Python if you haven't

```bash
brew install pyenv
pyenv install 3.9.2
```

---

### Run app on Android:

```bash
yarn patch:android && yarn android
```

### Run app on iOS:

```bash
yarn patch:ios && yarn ios
```

---

## Support

If you're experiencing any troubles with the setup guide you can share your issues in our [Discord](https://discord.gg/yVEcEzmrgm) at **#plug-mobile**

### Known Errors

- Error-1:

  ```bash
  env: node: No such file or directory
  Command PhaseScriptExecution failed with a nonzero exit code
  ```

- Solution-1:

  run `sudo ln -s "$(which node)" /usr/local/bin/node`
  then delete Plug-mobile folder from Delivered Data, clean build on Xcode and build again.
