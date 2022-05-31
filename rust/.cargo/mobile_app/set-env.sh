#/bin/bash

[[ "$@" -eq "aarch64-linux-android" ]] && export TARGET_CC=$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/aarch64-linux-android29-clang
[[ "$@" -eq "armv7-linux-androideabi" ]] && export TARGET_CC=$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/armv7a-linux-androideabi29-clang
[[ "$@" -eq "i686-linux-android" ]] && export TARGET_CC=$NDK_HOME/toolchains/llvm/prebuilt/darwin-x86_64/bin/i686-linux-android29-clang

echo $TARGET_CC