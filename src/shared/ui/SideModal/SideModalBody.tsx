import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

import style from './SideModalBody.module.scss';
import { useModals, useModalsActions } from './UseSideModalStore';

interface SideModalBodyProps {
  title?: string;
  isLarge?: boolean;
  children: ReactNode;
  className?: string;
}

interface SideModalTitleProps {
  title: string;
}

interface SideModalBodyProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

interface SideModalTitleProps {
  title: string;
}

interface SideModalBodyProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

interface SideModalTitleProps {
  title: string;
}

export function SideModalBody({ title, children, className, isLarge = false }: SideModalBodyProps) {
  const defaultPaddings = 'px-[69px] pt-8';
  const paddingsForLargeModal = 'px-10 pt-[38px]';

  return (
    <div className={classNames(style.sideModalBody, className, isLarge ? paddingsForLargeModal : defaultPaddings)}>
      {title && <SideModalTitle title={title} />}
      {children}
    </div>
  );
}

interface SideModalTitleProps {
  title: string;
}

function SideModalTitle({ title }: SideModalTitleProps) {
  const { close } = useModalsActions();
  const openedModals = useModals();
  const currentModal = useRef(openedModals.at(-1)).current;
  const isFirstModal = openedModals.at(0)?.id === currentModal?.id;

  return (
    <div className="flex select-none justify-between">
      <div className="mb-6 flex items-center">
        {!isFirstModal && (
          <MaterialIcon
            className="mr-4 cursor-pointer text-[24px] text-slate-700"
            onClick={close}
            {...getDataAutoTestAttributes([`button-back-${title.replaceAll(' ', '-')}`.toLocaleLowerCase()])}
          >
            arrow_back_ios
          </MaterialIcon>
        )}
        <div className="text-xl font-bold">{title}</div>
      </div>
      <MaterialIcon
        className="mt-1 cursor-pointer text-[24px] text-slate-700"
        onClick={close}
        {...getDataAutoTestAttributes([`button-close-${title.replaceAll(' ', '-')}`.toLocaleLowerCase()])}
      >
        close
      </MaterialIcon>
    </div>
  );
}
