import { create } from 'zustand';

import type { BlockingElements } from '../model';

const TWENTY_FOUR_HOURS_IN_SEC = 86_400;
const SAFE_OFFSET = 3;

interface BlockingTimeStore {
  isBlockingTime: boolean;
  blockingElementsList: string[];
  showBlockingBanner: boolean;
  timerIds: number[];
  startBlockingTimer: (timeLeftInSec: number) => void;
  startUnblockingTimer: (timeLeftInSec: number) => void;
  setBlockingElementsList: (elementsList: BlockingElements[]) => void;
  resetStore: () => void;
}

const InitialState = {
  isBlockingTime: false,
  showBlockingBanner: false,
  blockingElementsList: [],
  timerIds: [],
};

/**
 *  We have 3 timers:
 *  1) timer to show Blocking banner
 *  2) timer to turn on Blocking state
 *  3) timer to turn of Blocking state
 */
const BlockingTimeStore = create<BlockingTimeStore>((set, get) => ({
  ...InitialState,
  setBlockingElementsList: (elementsList = []) => {
    set({ blockingElementsList: [...elementsList] });
  },
  startBlockingTimer: (timeLeftInSec) => {
    // If it is less than 24h to blocking time, then show blocking banner
    // else start timer to show banner
    if (timeLeftInSec < TWENTY_FOUR_HOURS_IN_SEC) {
      set({ showBlockingBanner: true });
    } else {
      const bannerTimerId = window.setTimeout(() => {
        set({ showBlockingBanner: true });
      }, (timeLeftInSec - TWENTY_FOUR_HOURS_IN_SEC) * 1000);

      set({ timerIds: [...get().timerIds, bannerTimerId] });
    }

    // start timer to block
    const blockingTimerId = window.setTimeout(() => {
      set({ isBlockingTime: true });
    }, (timeLeftInSec - SAFE_OFFSET) * 1000);

    set({ timerIds: [...get().timerIds, blockingTimerId] });
  },
  // start timer to unblock
  startUnblockingTimer: (timeLeftInSecs) => {
    const unblockingTimerId = window.setTimeout(() => {
      set({ isBlockingTime: false, showBlockingBanner: false });
    }, (timeLeftInSecs + SAFE_OFFSET) * 1000);

    set({ timerIds: [...get().timerIds, unblockingTimerId] });
  },
  resetStore: () => {
    get().timerIds.forEach((timerId) => clearTimeout(timerId));
    set({ ...InitialState });
  },
}));

export const useIsBlockingTime = () => BlockingTimeStore((state) => state.isBlockingTime);
export const useShowBlockingBanner = () => BlockingTimeStore((state) => state.showBlockingBanner);
export const useStartBlockingTimer = () => BlockingTimeStore((state) => state.startBlockingTimer);
export const useStartUnblockingTimer = () => BlockingTimeStore((state) => state.startUnblockingTimer);
export const useSetBlockingElementsList = () => BlockingTimeStore((state) => state.setBlockingElementsList);
export const useResetBlockingStore = () => BlockingTimeStore((state) => state.resetStore);

export const useIsElementBlocked = (element: BlockingElements) =>
  BlockingTimeStore((state) => state.isBlockingTime && state.blockingElementsList.includes(element));
