import React from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

import { isAndroid } from '@/constants/platform';
import { Colors } from '@/constants/theme';
import Close from '@/icons/material/Close.svg';
import ErrorIcon from '@/icons/svg/ErrorIcon.svg';
import InfoIcon from '@/icons/svg/InfoIcon.svg';
import SuccessIcon from '@/icons/svg/SuccessIcon.svg';

import Text from '../Text';
import styles from './styles';

export enum ToastTypes {
  success = 'success',
  error = 'error',
  info = 'info',
}

export interface ToastProps {
  title: string;
  message?: string;
  type: 'success' | 'error' | 'info';
  id: string;
}

export const toastProviderProps = {
  placement: 'top',
  renderToast: (toast: any) => <Toast id={toast.id} {...toast.data} />,
};

const getToastStyles = (type: ToastTypes) => {
  switch (type) {
    case ToastTypes.success:
      return { Icon: SuccessIcon, colors: Colors.Toast.Success };
    case ToastTypes.error:
      return { Icon: ErrorIcon, colors: Colors.Toast.Error };
    default:
      return { Icon: InfoIcon, colors: Colors.Toast.Info };
  }
};

function Toast({ title, message, type, id }: ToastProps) {
  const toast = useToast();
  const { Icon, colors } = getToastStyles(type as ToastTypes);
  const { top } = useSafeAreaInsets();
  const handleClose = () => toast.hide(id);

  return (
    <LinearGradient
      colors={colors}
      style={[styles.container, { marginTop: isAndroid ? 25 : top }]}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Icon height={20} width={20} />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <Pressable onPress={handleClose}>
          <Close fill={Colors.White.Primary} height={20} />
        </Pressable>
      </View>
      {message && (
        <Text type="caption" style={styles.message}>
          {message}
        </Text>
      )}
    </LinearGradient>
  );
}

export default Toast;
