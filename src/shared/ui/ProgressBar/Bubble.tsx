import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import style from 'shared/ui/ProgressBar/Bubble.module.scss';

export function Bubble({
  bubbleText,
  title,
  isDisabled,
  isCurrent,
  isPassed,
  errorNum,
}: {
  bubbleText: string;
  title: string;
  isDisabled?: boolean;
  isCurrent?: boolean;
  isPassed?: boolean;
  errorNum?: number;
}) {
  return (
    <div className="relative">
      {errorNum && (
        <div className={style.error}>
          <div className={style.errorWrapper}>
            <div className={style.errorText}>{errorNum}</div>
          </div>
        </div>
      )}
      <div
        className={classNames(
          style.bubbleWrapper,
          {
            [style.isDisabled]: isDisabled && !isCurrent,
            [style.isCurrent]: isCurrent,
          },
          'relative rounded-xxl border border-solid text-base font-medium bg-deep-blue-500 text-white border-deep-blue-500 w-8 h-8'
        )}
      >
        <div className={classNames(style.bubble, 'absolute left-1/2 top-1/2 flex')}>
          {isPassed ? <MaterialIcon>check</MaterialIcon> : bubbleText}
        </div>
      </div>
      <div
        className={classNames(
          style.title,
          {
            [style.isDisabled]: isDisabled && !isCurrent,
            [style.isCurrent]: isCurrent,
          },
          'absolute top-[39px] whitespace-nowrap text-sm font-medium text-center left-1/2'
        )}
      >
        {title}
      </div>
    </div>
  );
}
