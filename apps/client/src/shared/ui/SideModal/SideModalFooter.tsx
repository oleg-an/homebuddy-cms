import type { ReactNode } from 'react';

interface SideModalFooterProps {
  children: ReactNode;
}

export function SideModalFooter({ children }: SideModalFooterProps) {
  return <div className="border-t border-slate-100 py-8 pl-[70px] pr-[82px]">{children}</div>;
}
