import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { ToastTypes } from '@/components/common/Toast';

function useCustomToast() {
  const toast = useToast();

  const showSuccess = useCallback((title: string, message?: string) => {
    toast.show(`${ToastTypes.success}-${title}`, {
      data: {
        type: ToastTypes.success,
        title,
        message,
      },
    });
  }, []);

  const showError = useCallback((title: string, message?: string) => {
    toast.show(`${ToastTypes.error}-${title}`, {
      data: {
        type: ToastTypes.error,
        title,
        message,
      },
    });
  }, []);

  const showInfo = useCallback((title: string, message?: string) => {
    toast.show(`${ToastTypes.info}-${title}`, {
      data: {
        type: ToastTypes.info,
        title,
        message,
      },
    });
  }, []);

  return { showError, showInfo, showSuccess };
}

export default useCustomToast;
