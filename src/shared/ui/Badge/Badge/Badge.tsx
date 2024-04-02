import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

import style from './Badge.module.scss';

type BadgeSizes = 'sm' | 'md' | 'lg' | 'extraLg';
type BadgeColors = 'deepGreen' | 'mint' | 'slate' | 'magenta' | 'red' | 'orange' | 'deepBlue' | 'yellow';
export type BadgeProps = {
  text: string;
  color: BadgeColors;
  size?: BadgeSizes;
  iconName?: string;
  className?: string;
};

export function Badge(props: BadgeProps) {
  const { text, className, color, iconName, size = 'sm' } = props;

  return (
    <div
      className={classNames(
        style.badge,
        {
          [style.large]: size === 'lg',
          [style.medium]: size === 'md',
          [style.extraLarge]: size === 'extraLg',
          [style.withIcon]: !!iconName,
        },
        style[color],
        className
      )}
      data-testid={`TestId_badge_for_${text}`}
      {...getDataAutoTestAttributes([`badge-${text.toLowerCase().replace(/\s/g, '-')}`]).attributes}
    >
      {iconName && <MaterialIcon className="mr-[6px] text-[16px]">{iconName}</MaterialIcon>}
      {text}
    </div>
  );
}
