import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

interface ModalDialogProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string | JSX.Element;
  subtitle?: string;
  className?: string;
}

export function EditStepModal({ children, isOpen, onClose, title, subtitle, className }: ModalDialogProps) {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="flex h-full justify-center p-4">
                <Dialog.Panel className={classNames('p-8 bg-white shadow-modal rounded-md flex flex-col', className)}>
                  <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
                  {subtitle && <Dialog.Description className="mt-2 text-sm">{subtitle}</Dialog.Description>}
                  {children}
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
