#/bin/bash

PROJ_DIR=$(builtin cd ..; builtin cd .. ; builtin cd .. ; pwd)

# Uncomment this line to enable full rust logs
# export RUST_BACKTRACE=full

# Set OpenSSL 3
if [[ -d /opt/homebrew/opt/openssl@3/ ]]; then
  export LDFLAGS="-L/opt/homebrew/opt/openssl@3/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/openssl@3/include"
  export PATH="/opt/homebrew/opt/openssl@3/bin:$PATH"
  export PKG_CONFIG_PATH="/opt/homebrew/opt/openssl@3/lib/pkg-config"
elif [[ -d /usr/local/opt/openssl@3/ ]]; then
  export LDFLAGS="-L/usr/local/opt/openssl@3/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl@3/include"
  export PATH="/usr/local/opt/openssl@3/bin:$PATH"
  export PKG_CONFIG_PATH="/usr/local/opt/openssl@3/lib/pkg-config"
else
  echo "OpenSSL not found, run 'brew install openssl@3'"
fi

# Set Android config
if [[ $@ == *android* ]]; then
  export PATH="$PROJ_DIR/NDK/arm64/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/arm/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/i686/bin:$PATH"
fi

# Set target specific config
if [ $@ = 'aarch64-linux-android' ]; then
  export TARGET_CC=$ANDROID_NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android29-clang
elif [ $@ = 'armv7-linux-androideabi' ]; then
  export TARGET_CC=$ANDROID_NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/armv7a-linux-androideabi29-clang
elif [ $@ = 'i686-linux-android' ]; then
  export TARGET_CC=$ANDROID_NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/i686-linux-android29-clang
fi

echo
echo
echo "============================="
echo "Target:"
echo $@
echo
echo "TARGET_CC:"
echo $TARGET_CC
echo 
echo "OpenSSL:"
openssl version
echo
echo "Clang:"
clang --version
echo "============================="
echo
echo