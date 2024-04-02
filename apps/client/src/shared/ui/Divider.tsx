import classNames from 'classnames';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <div className={classNames('w-full bg-slate-100 my-8 h-[1px]', className)} />;
}
