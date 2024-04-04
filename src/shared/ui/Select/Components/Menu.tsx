import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import styles from 'shared/ui/Select/Select.module.scss';

interface ListMenuProps {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  isSearch?: boolean;
}

export function ListMenu({ children, className, open, isSearch }: ListMenuProps) {
  return (
    <Transition
      as={Fragment}
      show={open}
      leave="transition ease-in bg-white"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={classNames(
          styles.body,
          {
            [styles.isSearch]: isSearch,
          },
          className
        )}
      >
        {children}
      </div>
    </Transition>
  );
}
