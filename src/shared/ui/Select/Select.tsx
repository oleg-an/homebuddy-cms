import React, { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Tooltip } from 'shared/ui/Tooltip';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import { isFunction } from 'shared/lib/type-guards';
import { MenuBase } from 'shared/ui/Select/Components/MenuBase';

import type { SelectModel, Option, RenderOption } from './models';
import style from './Select.module.scss';

const UNSELECTED_STATE_ID = '';

export function Select({
  className,
  wrapperClass,
  title,
  isDisabled,
  isLoading,
  isRequired,
  options = [],
  renderCustomOptions,
  selectedOptionId,
  error,
  isErrorMessageHidden,
  onChange,
  onClose,
  onCancel,
  isSmall,
  rightIcon,
  rightIconClass,
  leftIcon,
  leftIconClass,
  noOptional,
  dropdownClassName,
  menuItemClassName,
  listClassName,
  attributes,
  isSearch,
  isCancel,
  hideIcon,
  isCustomScrollbar,
  titleTooltipText,
  closeOnSelect = true,
}: SelectModel) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [arrowColor, setArrowColor] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const [preselectedHeaderText, setPreselectedHeaderText] = useState('');

  const getHeaderText = () => {
    if (renderCustomOptions) {
      const selectedOption = renderCustomOptions.find((item: RenderOption) => item.id === selectedOptionId);

      if (!selectedOption) {
        return '';
      }

      return isFunction(selectedOption.text) ? selectedOption.text() : selectedOption.text;
    }

    return options.find((item: Option) => item.id === selectedOptionId)?.text;
  };

  useEffect(() => {
    if (isDisabled) {
      setArrowColor('#C6CCD2');
    } else if (error) {
      setArrowColor('#BB0000');
    } else {
      isOpen && !rightIcon ? setArrowColor('#2F55EB') : setArrowColor('');
    }
  }, [isOpen, error, isDisabled, rightIcon]);

  const handleClose = (e: Event) => {
    const path = e.composedPath();

    if (selectRef.current && !path.includes(selectRef.current)) {
      onClose?.();
      setIsOpen(false);
    }

    setSearch('');
  };

  useClickAway(selectRef, handleClose);

  const toggleSelect = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const id = (e.target as HTMLElement).getAttribute('data-id') || '';

    e.stopPropagation();
    onChange?.(id);
    closeOnSelect && setIsOpen(false);
  };

  const onCancelClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onChange?.('');
    onCancel?.();
    setIsOpen(false);
    setPreselectedHeaderText('');
  };

  const isFilled = selectedOptionId && !!(preselectedHeaderText || getHeaderText());
  const selectStyles = classNames(
    [style.header],
    { [style.filled]: isFilled },
    { [style.active]: isOpen },
    { [style.error]: error },
    { [style.isDisabled]: isDisabled },
    { [style.small]: isSmall },
    { '!pl-[43px]': leftIcon },
    className
  );

  const menuItemStyles = classNames('hover:bg-deep-blue-25', style.menuItem, menuItemClassName);

  const getSelectList = () => {
    if (renderCustomOptions) {
      return renderCustomOptions.map((item: RenderOption) => (
        <div
          key={item.id}
          className={menuItemStyles}
          data-id={item.id}
        >
          {item.component}
        </div>
      ));
    }

    const optionsToRender = options.filter((option) => option.text.toLowerCase().includes(search.trim().toLowerCase()));

    return optionsToRender.map((item: Option) => (
      <div
        key={item.id}
        className={menuItemStyles}
        onClick={handleItemClick}
        data-id={item.id}
      >
        {item.text}
      </div>
    ));
  };

  const optionalMarker = (
    <span className={classNames(style.optionalMarker, { '!text-red-500': !!error })}>{' (optional)'}</span>
  );

  const isErrorShown = error && !isErrorMessageHidden;

  return (
    <div
      ref={selectRef}
      className={classNames(wrapperClass, 'relative')}
      {...attributes}
    >
      {leftIcon && !hideIcon && (
        <MaterialIcon
          className={classNames(
            { 'top-[8px]': isSmall, 'top-[18px]': !isSmall },
            'absolute left-4 text-[20px] select-none z-10 text-slate-300',
            leftIconClass
          )}
        >
          {leftIcon}
        </MaterialIcon>
      )}
      <div
        className={selectStyles}
        onClick={toggleSelect}
      >
        {!(selectedOptionId && isSmall) && (
          <span className={classNames(style.headerLabel)}>
            {title}
            {!isRequired && !noOptional && optionalMarker}
            {titleTooltipText && (
              <span className="relative">
                <Tooltip
                  placement="top-start"
                  content={titleTooltipText}
                  contentClass="!text-left"
                  widthClass="max-w-[260px]"
                >
                  <MaterialIcon className={style.titleTooltip}>info</MaterialIcon>
                </Tooltip>
              </span>
            )}
          </span>
        )}
        {!!selectedOptionId && (
          <p className={classNames(style.headerText, { [style.isCancel]: isCancel })}>
            {preselectedHeaderText || getHeaderText()}
          </p>
        )}
        {isCancel && selectedOptionId !== UNSELECTED_STATE_ID && isFilled && (
          <MaterialIcon
            {...getDataAutoTestAttributes(['button-close'])}
            className={classNames(style.cancel, { [style.isSmall]: isSmall })}
            onClick={onCancelClick}
          >
            cancel
          </MaterialIcon>
        )}
        {!hideIcon && (
          <MaterialIcon
            className={classNames(
              style.headerArrow,
              {
                'text-[16px]': !rightIcon,
                'text-[20px] !top-[17px] !text-slate-300': rightIcon && !isSmall,
                '!text-[20px] !top-[7px] !text-slate-300 right-[15px]': rightIcon && isSmall,
              },
              'select-none',
              rightIconClass
            )}
            style={{ color: arrowColor }}
          >
            {rightIcon ?? 'expand_more'}
          </MaterialIcon>
        )}
      </div>
      <MenuBase
        open={isOpen}
        isLoading={isLoading}
        options={options}
        setSearch={setSearch}
        search={search}
        getSelectList={getSelectList}
        isSearch={isSearch}
        isCustomScrollbar={isCustomScrollbar}
        listClassName={listClassName}
        className={dropdownClassName}
      />
      {isErrorShown && <p className="ml-4 mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
