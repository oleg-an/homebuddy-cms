import classNames from 'classnames';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

export function ContractorMenuLink({
  title,
  href,
  iconName,
  isSmallSize,
}: {
  title: string;
  href: string;
  iconName: string;
  isSmallSize?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isSelected = href === useLocation().pathname;
  const linkClass = classNames(
    'mb-2 select-none text-base flex items-center py-2 rounded-md hover:bg-slate-50 hover:text-slate-900',
    isSelected ? 'font-semibold text-slate-900 bg-slate-50' : 'font-medium text-slate-600',
    isSmallSize ? 'justify-center' : 'px-4'
  );

  return (
    <Link
      to={href}
      {...getDataAutoTestAttributes([`nav-menu-${title.toLowerCase().replaceAll(' ', '-')}`]).attributes}
    >
      <div
        className={linkClass}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <MaterialIcon className={classNames(isSelected || isHovered ? 'text-slate-700' : 'text-slate-400')}>
          {iconName}
        </MaterialIcon>
        {!isSmallSize && <div className="ml-3 border-transparent text-sm">{title}</div>}
      </div>
    </Link>
  );
}
