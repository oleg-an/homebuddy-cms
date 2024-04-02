import classNames from 'classnames';
import { createContext, useEffect, useState } from 'react';
import { useKey } from 'react-use';

import { useModalAnimationState } from './useModalAnimationState';
import type { SideModalModel } from './UseSideModalStore';
import { useModalsActions, useModals } from './UseSideModalStore';

export function SideModalContainer() {
  const modals = useModals();
  const { close } = useModalsActions();

  useKey('Escape', close);

  return (
    <>
      {!!modals.length && (
        <div
          onClick={close}
          className="absolute z-10 flex h-full w-full flex-col bg-slate-900/60"
        >
          {modals.map((modal) => (
            <SideModalWrapper
              key={modal.id}
              {...modal}
            />
          ))}
        </div>
      )}
    </>
  );
}

type SlideModalContext = {
  transitionEnd: boolean;
};

export const SlideModalContext = createContext<SlideModalContext>({ transitionEnd: false });

function SideModalWrapper({ body, isNeedToClose, id }: SideModalModel) {
  const { removeLastModal } = useModalsActions();
  const [isCloseTransition, setIsCloseTransition] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => setIsCloseTransition(false));
  }, []);

  useEffect(() => {
    if (isNeedToClose) {
      setIsCloseTransition(true);
    }
  }, [isNeedToClose]);

  const { ref, contextValue } = useModalAnimationState();

  return (
    <SlideModalContext.Provider value={contextValue}>
      <div
        data-testid={`modal${id}`}
        onTransitionEnd={() => {
          if (isNeedToClose) {
            removeLastModal();
            // remove last modal here
          }
        }}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          'flex flex-col h-full bg-white absolute right-0 top-0 ease-in-out duration-[400ms]',
          { 'translate-x-0': !isCloseTransition },
          { 'translate-x-full': isCloseTransition }
        )}
      >
        {body}
      </div>
    </SlideModalContext.Provider>
  );
}
