#/bin/bash
echo "Target: " $@
PROJ_DIR=$(builtin cd ..; builtin cd .. ; builtin cd .. ; pwd)

if [ $@ = 'aarch64-apple-ios' ]; then
  export TARGET_CC=
elif [ $@ = 'i386-apple-ios' ]; then
  export TARGET_CC=
elif [ $@ = 'aarch64-linux-android' ]; then
  export PATH="$PROJ_DIR/NDK/arm64/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/arm/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/i686/bin:$PATH"
  export TARGET_CC=$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android29-clang
elif [ $@ = 'armv7-linux-androideabi' ]; then
  export PATH="$PROJ_DIR/NDK/arm64/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/arm/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/i686/bin:$PATH"
  export TARGET_CC=$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/armv7a-linux-androideabi29-clang
elif [ $@ = 'i686-linux-android' ]; then
  export PATH="$PROJ_DIR/NDK/arm64/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/arm/bin:$PATH"
  export PATH="$PROJ_DIR/NDK/i686/bin:$PATH"
  export TARGET_CC=$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/i686-linux-android29-clang
else
  echo Target not detected!
fi

echo Using TARGET_CC
echo $TARGET_CC
echo
echo Using OpenSSL
openssl version
echo
echo Using clang
clang --version
echo
