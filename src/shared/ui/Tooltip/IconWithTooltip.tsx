import classnames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

import type { Placement } from './Tooltip';
import { Tooltip } from './Tooltip';

interface IconWithTooltipProps {
  tooltip: JSX.Element;
  icon: string;
  className?: string;
  iconClassNames: string;
  place?: Placement;
}

export function IconWithTooltip({ tooltip, className, icon, iconClassNames, place = 'bottom' }: IconWithTooltipProps) {
  return (
    <div className={classnames('inline-flex items-center', className)}>
      <Tooltip
        widthClass="w-[250px]"
        content={tooltip}
        placement={place}
      >
        <div className="cursor-pointer">
          <MaterialIcon className={iconClassNames}>{icon}</MaterialIcon>
        </div>
      </Tooltip>
    </div>
  );
}
