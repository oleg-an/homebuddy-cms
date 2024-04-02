import classNames from 'classnames';
import { ContentCopyButton } from 'shared/ui/ContentCopyButton';

export function Detail({
  className,
  title,
  value,
  copyValue,
}: {
  className?: string;
  title: string;
  value?: string | number | null;
  copyValue?: string | number | null;
}) {
  if (!value) {
    return <></>;
  }

  return (
    <div className="flex">
      <div className={classNames('mb-6 font-medium', className)}>
        <p className="text-xxs text-slate-600">{title}</p>
        <p
          className="mt-[2px] truncate text-sm"
          title={value.toString()}
        >
          {value}
        </p>
      </div>
      {copyValue && (
        <ContentCopyButton.CopyToClipboard
          value={copyValue.toString()}
          className="-ml-2 mt-[10px]"
        />
      )}
    </div>
  );
}
