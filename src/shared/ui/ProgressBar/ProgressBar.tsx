import classNames from 'classnames';
import { Bubble } from 'shared/ui/ProgressBar/Bubble';
import style from 'shared/ui/ProgressBar/ProgressBar.module.scss';

export interface ProgressBarItem {
  text: string;
  title: string;
  id: string;
  errorNum?: number;
}

interface ProgressBarProps {
  stepNumber: number;
  items: ProgressBarItem[];
  className?: string;
}

export function ProgressBar({ stepNumber, className = '', items }: ProgressBarProps) {
  return (
    <div
      className={classNames('flex', style.root, {
        [className]: !!className,
      })}
    >
      {items.map(({ text, title, id }, i) => {
        return (
          <div
            key={id}
            className="flex"
          >
            <Bubble
              bubbleText={text}
              title={title}
              isCurrent={i + 1 === stepNumber}
              isDisabled={i + 1 > stepNumber}
              isPassed={i + 1 < stepNumber}
            />
            {i < items.length - 1 && (
              <div
                className={classNames(style.line, {
                  [style.isDisabled]: i > stepNumber - 2,
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
