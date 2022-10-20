import { toast, ToastOptions } from 'react-toastify';

export function useAlert() {
  const alertSuccess = (message: string, option?: ToastOptions) => {
    toast.success(message, {
      style: {
        width: 'fit-content',
      },
      ...(option && option),
    });
  };

  const alertError = (message: string, option?: ToastOptions) => {
    toast.error(message, {
      style: {
        width: 'fit-content',
      },
      ...(option && option),
    });
  };

  const alertInfo = (message: string, option?: ToastOptions) => {
    toast.info(message, {
      style: {
        width: 'fit-content',
      },
      ...(option && option),
    });
  };

  const alertWarning = (message: string, option?: ToastOptions) => {
    toast.warning(message, {
      style: {
        width: 'fit-content',
      },
      ...(option && option),
    });
  };

  return {
    alertSuccess,
    alertError,
    alertInfo,
    alertWarning,
  };
}
