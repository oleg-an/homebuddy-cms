import { useState, useCallback } from 'react';
import type { CalendarContainerProps } from 'react-datepicker';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { noop } from 'shared/lib/functions';
import { useHidable } from 'shared/lib/hooks';
import { isNull } from 'shared/lib/type-guards';

import { CustomDateRanges } from './CustomDateRanges';
import { CustomHeader } from './CustomHeader';
import { CustomInput } from './CustomInput';
import type { PickerValue } from './date-ranges';

export type DatePickerProps = {
  placeholder?: string;
  className?: string;
  onChange?: (value: PickerValue[]) => void;
  value?: PickerValue[];
};

const EMPTY_RANGE = [null, null];

export function DatePickerRange({ placeholder, className, onChange = noop, value }: DatePickerProps) {
  const [dateRange, setDateRange] = useState<PickerValue[]>(value ?? EMPTY_RANGE);
  const openCalendarDialog = useHidable();
  const [startDate, endDate] = dateRange;

  const handleDateClear = useCallback(() => {
    onChange(EMPTY_RANGE);
    setDateRange(EMPTY_RANGE);
  }, [onChange]);

  const onSetDateRange = useCallback(
    (value: PickerValue[]) => {
      onChange(value);
      setDateRange(value);
    },
    [onChange]
  );

  const onClearClick = dateRange.every((date) => !isNull(date)) ? handleDateClear : undefined;

  const customCalendarContainer = ({ className, children }: CalendarContainerProps) => {
    return (
      openCalendarDialog.isShown && (
        <CalendarContainer className={className}>
          <div className="flex">
            <div className="mr-7">
              <CustomDateRanges
                selectedDateRange={dateRange}
                onSetDateRange={onSetDateRange}
                onClose={openCalendarDialog.hide}
              />
            </div>
            <div className="relative">{children}</div>
          </div>
        </CalendarContainer>
      )
    );
  };

  return (
    <DatePicker
      renderCustomHeader={CustomHeader}
      formatWeekDay={(nameOfDay) => nameOfDay.toString().substring(0, 3)}
      startDate={startDate}
      endDate={endDate}
      onChange={onSetDateRange}
      placeholderText={placeholder}
      calendarContainer={customCalendarContainer}
      onCalendarOpen={openCalendarDialog.show}
      onCalendarClose={openCalendarDialog.hide}
      customInput={
        <CustomInput
          onClearClick={onClearClick}
          isOpenCalendar={openCalendarDialog.isShown}
        />
      }
      className={className}
      selectsRange
      disabledKeyboardNavigation
    />
  );
}
