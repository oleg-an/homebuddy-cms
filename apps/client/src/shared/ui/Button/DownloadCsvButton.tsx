import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import type { DataAttributes } from 'shared/lib/data-auto-test';

import { Button } from './Button';

export type DownloadCsvButtonModel = {
  className?: string;
  onClick: () => void;
  isLoading: boolean;
  isDisabled?: boolean;
  text?: string;
  attributes?: DataAttributes['attributes'];
};

export function DownloadCsvButton({
  className,
  onClick,
  isLoading,
  isDisabled,
  text = 'Download CSV',
  attributes,
}: DownloadCsvButtonModel) {
  return (
    <div className={className}>
      <Button
        type="button"
        className="group h-9 !px-0"
        onClick={onClick}
        loading={isLoading}
        loaderClasses="h-6"
        disabled={isDisabled}
        variant="outline"
        attributes={attributes}
      >
        <div className="mx-[19px] flex items-center justify-center">
          <MaterialIcon
            className={classNames('text-deep-blue-500 group-hover:text-deep-blue-400 group-active:text-deep-blue-600', {
              'text-[20px]': !!text,
              'mr-2': !!text,
            })}
          >
            file_download
          </MaterialIcon>
          <div className="text-[14px]">{text}</div>
        </div>
      </Button>
    </div>
  );
}
