import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

export const useModalAnimationState = () => {
  const [transitionEnd, setTransitionEnd] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleTransitionEnd = useCallback(() => setTransitionEnd(true), []);

  const handleTransitionStart = useCallback(() => setTransitionEnd(false), []);

  useEffect(() => {
    ref.current?.addEventListener('transitionstart', handleTransitionStart);
    ref.current?.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      ref.current?.removeEventListener('transitionstart', handleTransitionStart);
      ref.current?.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      transitionEnd,
    }),
    [transitionEnd]
  );

  return {
    contextValue,
    ref,
  };
};
