import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

import style from './Checkbox.module.scss';
import type { CommonCheckboxProps } from './interfaces';

export function BaseCheckbox({
  isDisabled,
  isChecked,
  children,
  isPartial,
  inputProps,
  controlledProps,
  onClick,
  attributes,
  className,
}: CommonCheckboxProps) {
  const selectedIcon = isPartial ? 'indeterminate_check_box' : 'check_box';
  const checkBoxIcon = isChecked ? selectedIcon : 'check_box_outline_blank';

  return (
    <label
      className={classNames(className, style.checkbox, {
        [style.disabled]: isDisabled,
      })}
      {...attributes}
    >
      <input
        onClick={onClick}
        type="checkbox"
        {...inputProps}
        {...controlledProps}
      />
      <MaterialIcon
        className="mr-2 text-[17px] text-deep-blue-500"
        type="filled"
      >
        {checkBoxIcon}
      </MaterialIcon>
      <div className="text-xs text-slate-900">{children}</div>
    </label>
  );
}
