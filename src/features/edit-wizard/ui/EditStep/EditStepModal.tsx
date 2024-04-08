import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import type { StepModel } from 'entities/wizard';

import { EditStepModalBody } from './EditStepModalBody';

interface ModalDialogProps {
  isNewStep: boolean;
  isOpen: boolean;
  onClose: () => void;
  step: StepModel;
  onEdit: (step: StepModel) => void;
}

export function EditStepModal({ isOpen, onClose, step, onEdit, isNewStep }: ModalDialogProps) {
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
                <Dialog.Panel className={classNames('p-8 bg-white shadow-modal rounded-md flex flex-col w-[1000px]')}>
                  <Dialog.Title className="text-xl font-bold">{!isNewStep ? 'Edit step' : 'Create step'}</Dialog.Title>
                  <EditStepModalBody
                    step={step}
                    onEdit={onEdit}
                    onClose={onClose}
                  />
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
