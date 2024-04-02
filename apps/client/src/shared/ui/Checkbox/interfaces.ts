import type { ReactNode } from 'react';
import type { DataAttributes } from 'shared/lib/data-auto-test';

type HTMLInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref' | 'as'
>;

export interface CommonCheckboxProps {
  isDisabled?: boolean;
  isChecked?: boolean;
  isPartial?: boolean;
  children?: ReactNode;
  inputProps?: HTMLInputProps;
  onClick?: () => void;
  className?: string;
  controlledProps?: HTMLInputProps;
  attributes?: DataAttributes['attributes'];
}

export interface CheckboxProps extends CommonCheckboxProps {
  name: string;
}
