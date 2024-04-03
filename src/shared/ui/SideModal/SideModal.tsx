import type { ReactNode } from 'react';
import React from 'react';
import { Loader } from 'shared/ui/Loader';

export interface SideModalProps {
  isLoading?: boolean;
  children: ReactNode;
  isLarge?: boolean;
}

export function SideModal({ isLoading, children, isLarge = false }: SideModalProps) {
  const largeWidth = 'w-270';
  const defaultWidth = 'w-123';

  return (
    <div className={`${isLarge ? largeWidth : defaultWidth} flex h-full flex-col`}>
      {isLoading ? <Loader className="flex h-full flex-col items-center justify-center" /> : children}
    </div>
  );
}
