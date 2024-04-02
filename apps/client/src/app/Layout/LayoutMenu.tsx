import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

interface LayoutMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  logoClassName: string;
  smallLogoClassName: string;
  className?: string;
  children: ReactNode;
}

export function LayoutMenu({
  isMenuOpen,
  smallLogoClassName,
  logoClassName,
  className = '',
  children,
  setIsMenuOpen,
}: LayoutMenuProps) {
  return (
    <div className={classNames('w-full relative', isMenuOpen ? 'max-w-[248px]' : 'max-w-[72px]')}>
      <div className={classNames('flex shrink-0 flex-col overflow-y-auto p-4 h-full', className)}>
        <Link to={pageRoutes.app.wizard}>
          <div className="h-15">
            <div
              className={classNames({
                [`${logoClassName} h-12 max-w-[206px]`]: isMenuOpen,
                [`${smallLogoClassName} absolute h-8 w-8 top-6 left-5`]: !isMenuOpen,
              })}
            />
          </div>
        </Link>
        {children}
      </div>
      <div
        className={`absolute right-[-12px] top-[20px] z-[1] h-[24px] w-[24px] 
        cursor-pointer rounded-xxl border border-solid border-slate-100 bg-white`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MaterialIcon
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[8px] text-slate-300"
          {...getDataAutoTestAttributes(['button-header-toggle-menu'])}
        >
          {isMenuOpen ? 'arrow_back_ios_new' : 'arrow_forward_ios'}
        </MaterialIcon>
      </div>
    </div>
  );
}
