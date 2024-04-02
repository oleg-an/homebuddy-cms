import classNames from 'classnames';
import type { ToastOptions } from 'react-toastify';
import { Slide, toast } from 'react-toastify';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { logError } from 'shared/lib/log-errors';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

import { noop } from './functions';

enum icons {
  success = 'check_circle_outline',
  error = 'highlight_off',
  info = 'info',
  info_download = 'cloud_download',
  delete = 'delete_forever',
  download = 'cloud_download',
}

export const DEFAULT_ERROR_TOAST_MESSAGE = 'Something went wrong. Please try again.';
export const DEFAULT_ERROR_INFINITY_FILTERS = "Couldn't load filter options. Please try again.";

interface ToastBodyProps {
  message: string | JSX.Element;
  type: keyof typeof icons;
  className?: string;
}

function ToastBody({ message, type, className }: ToastBodyProps) {
  return (
    <div className={classNames('flex items-center justify-center ml-[39px]', className)}>
      <div className="mr-2 mt-[6px]">
        <MaterialIcon>{icons[type]}</MaterialIcon>
      </div>
      <div
        className="!text-sm !font-medium"
        {...getDataAutoTestAttributes(['toast-text']).attributes}
      >
        {message}
      </div>
    </div>
  );
}

const closeButton = () => (
  <MaterialIcon
    {...getDataAutoTestAttributes(['button-close-toast'])}
    className="mr-4 mt-4"
  >
    close
  </MaterialIcon>
);

const settings: ToastOptions = {
  draggable: false,
  closeButton,
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  transition: Slide,
};

export function showSuccessToast(message: string | JSX.Element, toastId?: string) {
  toast(
    <ToastBody
      message={message}
      type="success"
    />,
    {
      ...settings,
      toastId,
      className: '!bg-deep-green-500 !text-white !h-12 !px-4 !w-full-screen',
    }
  );
}

export function showErrorToast(message: string | JSX.Element, toastId?: string) {
  logError(message);

  toast(
    <ToastBody
      message={message}
      type="error"
    />,
    {
      ...settings,
      toastId,
      className: '!bg-red-500 !text-white !px-4 !w-full-screen',
    }
  );
}

type ShowDeleteToastParams = {
  text: string;
  onUndoClick: () => Promise<void>;
  toastId?: string;
};

export function showDeleteToast({ text, onUndoClick, toastId }: ShowDeleteToastParams) {
  function Body() {
    return (
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center">{text}</div>
        <button
          {...getDataAutoTestAttributes(['button-undo-toast']).attributes}
          className="ml-4 rounded-sm bg-white px-4 py-2 text-slate-900"
          onClick={onUndoClick}
        >
          Undo
        </button>
      </div>
    );
  }

  toast(
    <ToastBody
      message={<Body />}
      type="delete"
    />,
    {
      ...settings,
      toastId,
      className: '!bg-red-500 !text-white !px-4 !w-full-screen',
    }
  );
}

export const showDefaultErrorToast = () => showErrorToast(DEFAULT_ERROR_TOAST_MESSAGE, 'default_error');

export const showSessionExpiredToast = () => showErrorToast('Your session has expired', 'expired_session');

export function showInfoToast(message: string, toastId?: string) {
  toast(
    <ToastBody
      message={message}
      type="info"
    />,
    {
      ...settings,
      toastId,
      className: '!bg-deep-blue-500 !text-white !px-4 !w-full-screen',
    }
  );
}

export function showDownloadInfoToast(message: string, toastId?: string, onClose?: () => void) {
  toast(
    <ToastBody
      message={message}
      type="info_download"
    />,
    {
      ...settings,
      toastId,
      className: '!bg-deep-blue-500 !text-white !px-4 !w-full-screen',
      onClose,
    }
  );
}

export function showDownloadStartedToast(message: string, toastId?: string) {
  toast(
    <ToastBody
      message={message}
      type="download"
    />,
    {
      ...settings,
      toastId,
      className: '!bg-deep-blue-500 !text-white !px-4 !w-full-screen',
    }
  );
}

export const showDownloadToast = (title: string, onClick: () => void | Promise<void>) => {
  showSuccessToast(
    <div>
      {title}{' '}
      <span
        className="underline"
        onClick={(e) => {
          e.stopPropagation();
          onClick()?.finally(noop);
        }}
      >
        Click here
      </span>{' '}
      to download it manually.
    </div>
  );
};
