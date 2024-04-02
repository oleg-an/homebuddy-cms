import classNames from 'classnames';
import type { BadgeProps } from 'shared/ui/Badge';
import { Badge } from 'shared/ui/Badge';

interface TextWithBadgeProps {
  text: string;
  badgeProps: BadgeProps;
  className?: string;
}

export function TextWithBadge(props: TextWithBadgeProps) {
  const { text, badgeProps, className } = props;

  return (
    <div className={classNames(className, 'flex items-center justify-between')}>
      <p className="text-sm">{text}</p>
      <Badge {...badgeProps} />
    </div>
  );
}
