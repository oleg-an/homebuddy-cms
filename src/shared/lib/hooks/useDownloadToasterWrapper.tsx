import { useEffect, useState } from 'react';
import { showDownloadInfoToast, showSuccessToast } from 'shared/lib/notifications';
import { logError } from 'shared/lib/log-errors';

interface DownloadCSVWithToastersProps {
  isLoaded: boolean;
  download: () => Promise<void>;
}

export function useDownloadToasterWrapper({ isLoaded, download }: DownloadCSVWithToastersProps) {
  const [isInfoClosed, setIsInfoClosed] = useState(false);

  useEffect(() => {
    if (isLoaded && isInfoClosed) {
      showSuccessToast('The download is successfully completed', 'toast-success');
      setIsInfoClosed(false);
    }
  }, [isLoaded, isInfoClosed]);

  const getCSV = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    showDownloadInfoToast('This download will take a moment, please wait...', 'toast-info', () =>
      setIsInfoClosed(true)
    );

    download().then().catch(logError);
  };

  return { getCSV };
}
