import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children, domId, wrapperId }: { children: ReactNode; domId: string; wrapperId?: string }) => {
  const mount = document.getElementById(domId);
  const el = document.createElement('div');

  useEffect(() => {
    if (mount) {
      if (wrapperId) {
        el.setAttribute('id', wrapperId);
      }
      mount.appendChild(el);
    } else {
      throw new Error(`There is no element with id: ${domId} in DOM`);
    }

    return () => {
      mount.removeChild(el);
    };
  }, [el, mount, wrapperId]);

  return createPortal(children, el);
};
