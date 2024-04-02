import classNames from 'classnames';
import { logError } from 'shared/lib/log-errors';
import { Button } from 'shared/ui/Button';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Tooltip } from 'shared/ui/Tooltip';

interface ContentCopyButtonProps {
  onClick: () => void;
  content: string;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

export function ContentCopyButton({
  onClick,
  content,
  buttonClassName,
  iconClassName,
  tooltipClassName,
  className,
}: ContentCopyButtonProps) {
  return (
    <div className={className}>
      <Tooltip
        content={content}
        placement="top"
        className={tooltipClassName}
      >
        <Button
          className={classNames('h-[32px] w-[32px]', buttonClassName)}
          size="small"
          variant="outline-second"
          type="button"
          onClick={onClick}
        >
          <MaterialIcon className={classNames('flex items-center justify-center text-sm', iconClassName)}>
            content_copy
          </MaterialIcon>
        </Button>
      </Tooltip>
    </div>
  );
}

interface CopyToClipboardProps {
  value: string;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

function CopyToClipboard({ value, className, iconClassName, buttonClassName, tooltipClassName }: CopyToClipboardProps) {
  const onClickHandler = () => {
    navigator.clipboard.writeText(value).catch(logError);
  };

  return (
    <ContentCopyButton
      onClick={onClickHandler}
      content="Copy to clipboard"
      className={className}
      iconClassName={classNames('!text-base text-slate-300 group-hover:text-deep-blue-500', iconClassName)}
      tooltipClassName={classNames('ml-4', tooltipClassName)}
      buttonClassName={classNames('group', buttonClassName)}
    />
  );
}

ContentCopyButton.CopyToClipboard = CopyToClipboard;
