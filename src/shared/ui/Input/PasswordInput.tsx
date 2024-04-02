import type { DataAttributes } from 'shared/lib/data-auto-test';
import { useHidable } from 'shared/lib/hooks';

import { Input } from './Input';

interface PasswordInputProps {
  name: string;
  title: string;
  isDisabled?: boolean;
  className?: string;
  debounceTime?: number;
  attributes?: DataAttributes['attributes'];
}

export function PasswordInput({ name, title, isDisabled, className, debounceTime, attributes }: PasswordInputProps) {
  const { isShown, show, hide } = useHidable(false);

  return (
    <Input
      name={name}
      title={title}
      debounceTime={debounceTime}
      type={isShown ? 'text' : 'password'}
      isDisabled={isDisabled}
      className={className}
      iconClick={isShown ? hide : show}
      iconName={isShown ? 'visibility_off' : 'visibility'}
      iconType="right"
      attributes={attributes}
    />
  );
}
