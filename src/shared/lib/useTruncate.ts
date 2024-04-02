import { useState, useCallback, useRef } from 'react';
import { isNull } from 'shared/lib/type-guards';

const checkIsTruncated = (element?: HTMLSpanElement | null) => {
  if (!element) {
    return false;
  }

  const { scrollHeight, scrollWidth, clientHeight, clientWidth } = element;

  return scrollHeight > clientHeight || scrollWidth > clientWidth;
};

export const useTruncate = (
  rootSelector?: (rootRef: React.MutableRefObject<HTMLDivElement | undefined>) => HTMLSpanElement | undefined
) => {
  const rootRef = useRef<HTMLDivElement>();
  const [isTruncated, setIsTruncated] = useState(false);

  const setTooltipHandler = () => {
    if (rootRef.current) {
      const span = rootSelector ? rootSelector(rootRef) : rootRef.current.querySelector('span');

      setIsTruncated(checkIsTruncated(span));
    }
  };

  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!isNull(node)) {
      rootRef.current = node;
    }
    setTooltipHandler();
  }, []);

  return {
    isTruncated,
    ref,
  };
};
