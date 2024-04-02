import { create } from 'zustand';

const useTitleStore = create<{
  title: string | null;
  actions: {
    setTitle: (title: string) => void;
    removeTitle: () => void;
  };
}>((set) => ({
  title: '',
  actions: {
    setTitle: (title: string) => {
      set(() => ({ title }));
    },
    removeTitle: () => {
      set(() => ({ title: null }));
    },
  },
}));

export const useTitleStoreTitle = () => useTitleStore((state) => state.title);
export const useTitleStoreActions = () => useTitleStore((state) => state.actions);
