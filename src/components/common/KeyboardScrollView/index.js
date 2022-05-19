import { HeaderHeightContext } from '@react-navigation/elements';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import styles from './styles';

function KeyboardScrollView({
  children,
  keyboardShouldPersistTaps,
  keyboardStyle,
  safeAreaStyle,
  scrollviewRef,
  scrollViewProps,
}) {
  return (
    <HeaderHeightContext.Consumer>
      {headerHeight => (
        <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
          <KeyboardAvoidingView
            style={[styles.keyboard, keyboardStyle]}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
            keyboardVerticalOffset={Platform.select({
              ios: headerHeight,
            })}>
            <ScrollView
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={styles.scrollContent}
              ref={scrollviewRef}
              {...scrollViewProps}>
              {children}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </HeaderHeightContext.Consumer>
  );
}

export default KeyboardScrollView;
