import classNames from 'classnames';

interface TextareaPlaceholderProps {
  placeholder?: string;
  isOptional?: boolean;
  className?: string;
}

export function TextareaPlaceholder({ placeholder, isOptional, className }: TextareaPlaceholderProps) {
  return (
    <div className={classNames(className, 'pointer-events-none absolute z-10 text-[14px] font-medium text-slate-900')}>
      {placeholder}
      {isOptional ? <span className="text-slate-400">{` (optional)`}</span> : ''}
    </div>
  );
}
