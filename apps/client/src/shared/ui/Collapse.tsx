import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import type { DataAttributes } from 'shared/lib/data-auto-test';

interface CollapseProps extends DataAttributes {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  titleChildren?: React.ReactNode;
  className?: string;
}

export function Collapse(props: CollapseProps) {
  const { title, children, defaultOpen, titleChildren, className } = props;

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <div className={className}>
            <Disclosure.Button className="flex gap-2 text-lg font-semibold text-slate-900">
              <MaterialIcon
                className={classNames(
                  'text-[24px] transition duration-300 ease-out text-slate-700',
                  open && 'transform rotate-180'
                )}
              >
                expand_more
              </MaterialIcon>
              <div {...props.attributes}>{title}</div>
            </Disclosure.Button>
            {titleChildren}
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="text-gray-500">{children}</Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
