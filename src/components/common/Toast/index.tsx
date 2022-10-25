import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';

import { Colors } from '@/constants/theme';
import Close from '@/icons/material/Close.svg';
import ErrorIcon from '@/icons/svg/ErrorIcon.svg';
import InfoIcon from '@/icons/svg/InfoIcon.svg';
import SuccessIcon from '@/icons/svg/SuccessIcon.svg';

import Text from '../Text';
import Touchable from '../Touchable';
import styles from './styles';

export enum ToastTypes {
  success = 'success',
  error = 'error',
  info = 'info',
}

export interface ToastProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const toastProps = {
  placement: 'top',
  offset: 35,
  renderToast: (toast: any) => <Toast {...toast.data} />,
};

const getToastStyles = (type: ToastTypes) => {
  switch (type) {
    case ToastTypes.success:
      return { Icon: SuccessIcon, colors: ['#4A763B', '#54AA46'] };
    case ToastTypes.error:
      return { Icon: ErrorIcon, colors: ['#9D2F4A', '#EC4765'] };
    default:
      return { Icon: InfoIcon, colors: ['#2F539D', '#477DEC'] };
  }
};

function Toast({ title, message, type }: ToastProps) {
  const toast = useToast();
  const { Icon, colors } = getToastStyles(type as ToastTypes);

  const handleClose = () => toast.hideAll();

  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Icon height={20} width={20} />
          <Text type="headline1" style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <Touchable onPress={handleClose}>
          <Close fill={Colors.White.Primary} height={20} />
        </Touchable>
      </View>
      <Text type="caption" style={styles.message}>
        {message}
      </Text>
    </LinearGradient>
  );
}

export default Toast;
