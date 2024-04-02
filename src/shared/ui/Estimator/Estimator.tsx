import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Tooltip } from 'shared/ui/Tooltip';

import style from './Estimator.module.scss';

export interface EstimatorProps {
  title: string;
  items: EstimatorItemProps[];
  tooltipContent?: string;
}

export function Estimator(props: EstimatorProps) {
  const { title, tooltipContent, items } = props;

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div
            className={classNames(
              'flex justify-between border border-deep-blue-100 p-[13px] bg-deep-blue-25',
              open ? 'rounded-t-sm' : 'rounded-sm'
            )}
          >
            <div className="flex items-center">
              <div className={style.bulbWrapper}>
                <MaterialIcon className="text-[22px] text-deep-blue-500">tips_and_updates</MaterialIcon>
              </div>
              <span className="ml-[14px] mr-[5px] text-sm font-semibold text-deep-blue-500">{title}</span>
              {tooltipContent && (
                <Tooltip
                  placement="top-start"
                  contentClass="!text-left"
                  content={tooltipContent}
                >
                  <MaterialIcon className="cursor-pointer pt-[3px] text-sm text-deep-blue-500">info</MaterialIcon>
                </Tooltip>
              )}
            </div>
            <Disclosure.Button className="flex items-center">
              <MaterialIcon
                className={classNames(
                  'text-[20px] transition duration-300 ease-out text-deep-blue-500',
                  open && 'transform rotate-180'
                )}
              >
                expand_more
              </MaterialIcon>
            </Disclosure.Button>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="text-gray-500 flex flex-col gap-[14px] rounded-b-sm border border-deep-blue-100 border-t-transparent bg-white p-[14px]">
              {items.map(({ info, content }) => (
                <EstimatorItem
                  key={info}
                  info={info}
                  content={content}
                />
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export interface EstimatorItemProps {
  info: string;
  content: string;
}

export function EstimatorItem({ info, content }: EstimatorItemProps) {
  return (
    <div className={style.estimationItem}>
      <span className="text-xxs font-medium text-slate-600">{info}</span>
      <span className="text-base font-medium text-slate-900">{content}</span>
    </div>
  );
}
