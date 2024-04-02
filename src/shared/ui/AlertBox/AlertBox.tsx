import classNames from 'classnames';
import type { ReactNode } from 'react';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

interface AlertBox {
  className?: string;
  children: ReactNode | string;
  iconName?: string;
  iconClass?: string;
  bodyClass?: string;
}

export function AlertBox({ className, children, iconName, iconClass, bodyClass }: AlertBox) {
  const rootClass = classNames('flex gap-4 justify-start items-start rounded-md border w-full p-4', className);

  return (
    <div className={rootClass}>
      {iconName && <MaterialIcon className={classNames('max-w-[24px]', iconClass)}>{iconName}</MaterialIcon>}
      <div className={classNames('text-sm font-normal leading-5 tracking-normal', bodyClass)}>{children}</div>
    </div>
  );
}
