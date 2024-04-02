import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

interface ButtonGroupsProps {
  isActivated?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ButtonQuickFilter({ onClick, className, isActivated }: ButtonGroupsProps) {
  return (
    <div
      data-testid="TestId__button-quick-filter"
      className={classNames(
        'flex items-center justify-center border border-slate-100 rounded-sm w-[36px] h-[36px] cursor-pointer select-none hover:bg-slate-200 group',
        className,
        { 'bg-slate-200': isActivated }
      )}
      onClick={onClick}
    >
      <MaterialIcon
        className={classNames('text-[20px] text-slate-300 group-hover:text-slate-600', {
          'text-slate-600': isActivated,
        })}
      >
        tune
      </MaterialIcon>
    </div>
  );
}
