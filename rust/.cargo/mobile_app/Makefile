ARCHS_IOS = aarch64-apple-ios i386-apple-ios
ARCHS_ANDROID = aarch64-linux-android armv7-linux-androideabi i686-linux-android
all: ios android
ios: $(ARCHS_IOS)
android: $(ARCHS_ANDROID)
	sh copy-android.sh
.PHONY: $(ARCHS_IOS)
$(ARCHS_IOS): %:
	source set-env.sh $@ && cargo lipo --release && npm run rename-build
.PHONY: $(ARCHS_ANDROID)
$(ARCHS_ANDROID): %:
	source set-env.sh $@ && cargo build --target $@ --release
