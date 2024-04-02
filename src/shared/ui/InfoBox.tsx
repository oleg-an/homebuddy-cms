import classNames from 'classnames';
import type { ReactNode } from 'react';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

interface InfoBoxProps {
  className?: string;
  title: string;
  text: string;
  button?: ReactNode;
  picture?: ReactNode;
}

export function InfoBox({ className, title, text, button, picture }: InfoBoxProps) {
  return (
    <div
      {...getDataAutoTestAttributes(['empty-table-message']).attributes}
      className={classNames(
        'flex items-center flex-col rounded-md px-6 py-12 border border-slate-100 text-center',
        className
      )}
    >
      {picture && <div className="mb-6">{picture}</div>}
      <div className="mb-2 text-xl font-medium">{title}</div>
      <div
        className={classNames('text-sm font-normal', {
          'mb-6': !!button,
        })}
      >
        {text}
      </div>
      {button}
    </div>
  );
}
