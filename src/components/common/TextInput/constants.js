import { Colors } from '@/constants/theme';

import styles from './styles';

export const variants = {
  text: {
    viewStyle: { ...styles.viewStyle, ...styles.textStyle },
    inputStyle: styles.inputStyle,
    placeholderTextColor: Colors.White.Secondary,
    autoCorrect: false,
    autoCapitalize: 'none',
    secureTextEntry: false,
  },
  multi: {
    viewStyle: { ...styles.viewStyle, ...styles.multiStyle },
    inputStyle: { ...styles.inputStyle, ...styles.multiStyle },
    placeholderTextColor: Colors.White.Secondary,
    autoCorrect: false,
    autoCapitalize: 'none',
    secureTextEntry: false,
  },
  password: {
    viewStyle: styles.viewStyle,
    inputStyle: styles.inputStyle,
    placeholderTextColor: Colors.White.Secondary,
    autoCorrect: false,
    autoCapitalize: 'none',
    secureTextEntry: true,
  },
  innerLabel: {
    viewStyle: { ...styles.labledViewStyle },
    inputStyle: { ...styles.inputStyle, ...styles.labledInputStyle },
    innerLabelStyle: styles.innerLabelStyle,
    placeholderTextColor: Colors.White.Secondary,
    autoCorrect: false,
    autoCapitalize: 'none',
    secureTextEntry: false,
  },
};
