import { useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(ref: T | null | Array<T | null>, callback: () => void) {
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (Array.isArray(ref)) {
        const containsTarget = ref.some((refElement) => refElement && refElement.contains(e.target as Node));

        if (!containsTarget) {
          callback();
        }
      } else if (ref && !ref.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [ref, callback]);
}
