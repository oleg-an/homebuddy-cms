import { create } from 'zustand';

export enum Roles {
  Contractor = 'Contractor',
}

// We do not need to use atomic stores with this state
// We need to trigger rerender in all situations when role is changed
export const useClientDataStore = create<{
  _role: Roles | null;
  setRole: (role: Roles | null) => void;
  removeRole: () => void;
  getRole: () => Roles | null;
}>((set, get) => ({
  _role: null,
  setRole: (_role: Roles | null) => {
    set(() => ({ _role }));
  },
  removeRole: () => {
    set(() => ({ _role: null }));
  },
  getRole: () => {
    return get()._role;
  },
}));
