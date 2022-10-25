import { useToast } from 'react-native-toast-notifications';

import { ToastTypes } from '@/components/common/Toast';

function useCustomToast() {
  const toast = useToast();

  const showSuccess = (title: string, message: string) => {
    toast.show(`${ToastTypes.success}-${title}`, {
      data: {
        type: ToastTypes.success,
        title,
        message,
      },
    });
  };

  const showError = (title: string, message: string) => {
    toast.show(`${ToastTypes.error}-${title}`, {
      data: {
        type: ToastTypes.error,
        title,
        message,
      },
    });
  };

  const showInfo = (title: string, message: string) => {
    toast.show(`${ToastTypes.info}-${title}`, {
      data: {
        type: ToastTypes.info,
        title,
        message,
      },
    });
  };

  return { showError, showInfo, showSuccess };
}

export default useCustomToast;
