import { useFormContext } from 'react-hook-form';

import { BaseCheckbox } from './BaseCheckbox';
import type { CheckboxProps } from './interfaces';

export function Checkbox(props: CheckboxProps) {
  const methods = useFormContext();

  const { isChecked, ...rest } = props;
  const { controlledProps = {} } = rest;

  const name = methods.watch(props.name);
  const isLocalChecked = 'checked' in controlledProps ? controlledProps.checked : name;

  return (
    <BaseCheckbox
      {...rest}
      inputProps={{
        ...methods.register(props.name, {
          value: isChecked,
        }),
      }}
      isChecked={isLocalChecked}
    />
  );
}
