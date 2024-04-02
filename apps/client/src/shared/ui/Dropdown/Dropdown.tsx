import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { uuidv4 } from 'shared/lib/uuidv4';
import { Portal } from 'shared/ui/Portal';
import { Loader } from 'shared/ui/Loader';
import type { DataAttributes } from 'shared/lib/data-auto-test';

import { usePopper } from './PopperHook';

interface DropdownProps extends DataAttributes {
  options: DropdownOption[];
  isLoading?: boolean;
  toggleButton: ReactNode;
}

interface DropdownOption extends DataAttributes {
  id: number;
  text: string;
  isDisabled?: boolean;
  onClick?: (id: number) => void;
}

export function Dropdown({ options, isLoading, toggleButton, attributes }: DropdownProps) {
  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [17, 20] } }],
  });

  const id = useRef(uuidv4()).current;

  return (
    <Menu as="div">
      <Menu.Button
        ref={trigger}
        {...attributes}
      >
        {toggleButton}
      </Menu.Button>
      <Portal
        domId="dropdown"
        wrapperId={id}
      >
        <Menu.Items
          ref={container}
          className="w-[178px] rounded-sm bg-white shadow-dropdown focus:outline-none"
        >
          {isLoading ? (
            <Menu.Item>
              <Loader className="my-2 flex justify-center" />
            </Menu.Item>
          ) : (
            options.map(({ id, isDisabled, text, onClick, attributes }) => {
              return (
                <Menu.Item
                  key={id}
                  disabled={isDisabled}
                >
                  {({ active }) => (
                    <div
                      {...attributes}
                      className={classNames(
                        'px-4 py-2 font-normal text-sm text-left cursor-pointer select-none',
                        { 'bg-deep-blue-25': active },
                        { 'cursor-no-drop': isDisabled }
                      )}
                      onClick={onClick ? () => onClick(id) : () => {}}
                    >
                      {text}
                    </div>
                  )}
                </Menu.Item>
              );
            })
          )}
        </Menu.Items>
      </Portal>
    </Menu>
  );
}
