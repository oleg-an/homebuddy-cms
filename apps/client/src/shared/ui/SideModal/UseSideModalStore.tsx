import type { ReactNode } from 'react';
import { create } from 'zustand';

export interface SideModalModel {
  id: number;
  body: ReactNode;
  isNeedToClose?: boolean;
  onCloseEvent?: () => void;
}

type ValueOf<T> = T[keyof T];

const updateLastModal = (modals: SideModalModel[], newValues: Record<string, ValueOf<SideModalModel>>) => {
  return modals.map((modal, i) => {
    if (i === modals.length - 1 || modals[i + 1].isNeedToClose) {
      return { ...modal, ...newValues };
    }

    return modal;
  });
};

interface ModalsStoreModel {
  id: number;
  modals: SideModalModel[];
  actions: {
    open: (body: ReactNode) => void;
    removeLastModal: () => void;
    close: () => void;
    forceClose: () => void;
    closeAll: () => void;
    addCloseEvent: (func: () => void) => void;
    removeCloseEvent: () => void;
    closeAllBesidesFirst: () => void;
    removeModalByIndex: (index: number) => void;
  };
}

const useModalsStore = create<ModalsStoreModel>((set, get) => ({
  id: 1,
  modals: [],
  actions: {
    open: (body) =>
      set((state) => ({
        id: state.id + 1,
        modals: [...state.modals, { body, id: state.id }],
      })),
    removeLastModal: () =>
      set((state) => ({
        modals: state.modals.slice(0, state.modals.length - 1),
      })),
    removeModalByIndex: (index: number) =>
      set((state) => ({
        modals: state.modals.filter((_, i) => i !== index),
      })),
    closeAll: () =>
      set(({ modals }) => {
        const last = modals.at(-1);

        return { modals: last ? [{ ...last, isNeedToClose: true }] : [] };
      }),
    close: () => {
      const modals = get().modals;
      const last = modals.at(-1);

      if (!last) {
        return;
      }
      if (last.onCloseEvent) {
        last.onCloseEvent();

        return;
      }
      get().actions.forceClose();
    },
    forceClose: () => {
      set(({ modals }) => {
        const updatedModals = updateLastModal(modals, { isNeedToClose: true });

        return { modals: updatedModals };
      });
    },
    addCloseEvent: (func) =>
      set(({ modals }) => {
        const updatedModals = updateLastModal(modals, { onCloseEvent: func });

        return { modals: updatedModals };
      }),
    removeCloseEvent: () =>
      set(({ modals }) => {
        const updatedModals = updateLastModal(modals, {
          onCloseEvent: undefined,
        });

        return { modals: updatedModals };
      }),
    closeAllBesidesFirst: () =>
      set(({ modals }) => {
        if (modals.length < 2) {
          return { modals };
        }

        const updatedModals = [modals[0], { ...modals[modals.length - 1], isNeedToClose: true }];

        return { modals: updatedModals };
      }),
  },
}));

export const useModals = () => useModalsStore((state) => state.modals);
export const useModalsId = () => useModalsStore((state) => state.id);
export const useModalsActions = () => useModalsStore((state) => state.actions);
