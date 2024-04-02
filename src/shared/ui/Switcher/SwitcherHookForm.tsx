import React from 'react';
import { useController } from 'react-hook-form';

import type { SwitcherProps } from './Switcher';
import { Switcher } from './Switcher';

export function SwitcherHookForm({ name }: Omit<SwitcherProps, 'onChange' | 'checked'>) {
  const {
    field: { onChange, value },
  } = useController({ name });

  return (
    <Switcher
      name={name}
      checked={value}
      onChange={onChange}
    />
  );
}
