import { useRef, useState } from 'react';

export const useHidable = (initialIsShown = false) => {
  const [isShown, setIsShown] = useState(initialIsShown);
  const handlers = useRef({
    show: () => setIsShown(true),
    hide: () => setIsShown(false),
  });

  return {
    // always boolean, useful when undefined needs to be interpreted as false
    isHidden: !isShown,
    // if initial was undefined than isShown can be either
    // useful when undefined needs to be interpreted as 3d state - not defined yet
    isShown,
    ...handlers.current,
  };
};
