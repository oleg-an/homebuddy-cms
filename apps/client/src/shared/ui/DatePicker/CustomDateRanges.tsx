import classNames from 'classnames';
import { useMemo } from 'react';

import type { PickerValue } from './date-ranges';
import { DATE_RANGES, isDateRangesEquals } from './date-ranges';

interface CustomDateRangeProps {
  onSetDateRange: (value: PickerValue[]) => void;
  onClose: () => void;
  selectedDateRange: PickerValue[];
}

export function CustomDateRanges({ onSetDateRange, onClose, selectedDateRange }: CustomDateRangeProps) {
  const selectedButtonIndex = useMemo(
    () => DATE_RANGES.findIndex((dateRange) => isDateRangesEquals(dateRange.getValue(), selectedDateRange)),
    [DATE_RANGES, selectedDateRange]
  );

  return (
    <>
      {DATE_RANGES.map(({ name, getValue }, index) => {
        const isActiveButton = index === selectedButtonIndex;

        return (
          <button
            style={{
              fontFamily: 'Inter',
            }}
            key={name}
            className={classNames('block h-6 w-32 text-xs font-medium rounded-sm', {
              'mt-[6px]': index > 0,
              'text-slate-900 hover:bg-deep-blue-25': !isActiveButton,
              'bg-deep-blue-500 text-white': isActiveButton,
            })}
            onClick={() => {
              onClose();
              onSetDateRange(getValue());
            }}
          >
            {name}
          </button>
        );
      })}
    </>
  );
}
