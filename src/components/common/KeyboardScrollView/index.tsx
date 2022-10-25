import { HeaderHeightContext } from '@react-navigation/elements';
import React from 'react';
import { ScrollViewProps } from 'react-native';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';

import styles from './styles';

interface Props {
  children: React.ReactNode;
  keyboardShouldPersistTaps?:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
  keyboardStyle?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  scrollviewRef?: React.RefObject<ScrollView>;
  scrollViewProps?: ScrollViewProps;
  contentStyle?: StyleProp<ViewStyle>;
}

function KeyboardScrollView({
  children,
  keyboardShouldPersistTaps,
  keyboardStyle,
  safeAreaStyle,
  scrollviewRef,
  scrollViewProps,
  contentStyle,
}: Props) {
  return (
    <HeaderHeightContext.Consumer>
      {headerHeight => (
        <SafeAreaView style={[styles.flex, safeAreaStyle]}>
          <KeyboardAvoidingView
            style={[styles.flex, keyboardStyle]}
            behavior={Platform.select({ ios: 'padding', android: undefined })}
            keyboardVerticalOffset={Platform.select({
              ios: headerHeight,
            })}>
            <ScrollView
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              showsVerticalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={[styles.scrollContent, contentStyle]}
              ref={scrollviewRef}
              overScrollMode="never"
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
