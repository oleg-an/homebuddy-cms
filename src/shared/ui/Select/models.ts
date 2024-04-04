import type { DataAttributes } from 'shared/lib/data-auto-test';

export interface Option {
  /*
      Do not change id type to number because of implementation
      onChange will always set value in string type.
    */
  id: string;
  text: string;
}

export interface RenderOption {
  id: string;
  text: string | ((...args: string[]) => string);
  component: JSX.Element;
}

export interface CustomMenuProps {
  open: boolean;
  options: Option[];
  selectedOptionId: string;
  handleSelect: (id: string) => void;
  setHeaderText?: (text: string) => void;
}

export interface SelectModel {
  title: string;
  selectedOptionId?: string;
  options?: Option[];
  renderCustomOptions?: RenderOption[];
  renderCustomMenu?: (params: CustomMenuProps) => React.ReactNode;
  onChange?: (id: string) => void;
  onCancel?: () => void;
  onClose?: () => void;
  className?: string;
  wrapperClass?: string;
  dropdownClassName?: string;
  menuItemClassName?: string;
  listClassName?: string;
  isCustomScrollbar?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  isErrorMessageHidden?: boolean;
  isSmall?: boolean;
  isSearch?: boolean;
  isCancel?: boolean;
  error?: string;
  rightIcon?: string;
  rightIconClass?: string;
  leftIcon?: string;
  leftIconClass?: string;
  noOptional?: boolean;
  hideIcon?: boolean;
  titleTooltipText?: string;
  closeOnSelect?: boolean;
  attributes?: DataAttributes['attributes'];
}
