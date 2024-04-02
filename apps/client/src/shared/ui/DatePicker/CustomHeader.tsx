import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function CustomHeader({ date, increaseMonth, decreaseMonth }: ReactDatePickerCustomHeaderProps) {
  const iconClassName = 'select-none cursor-pointer text-[18px] text-deep-blue-500 mt-[1px]';
  const title = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

  return (
    <div className="align-center flex justify-between">
      <button
        className="ml-[-15px] h-[18px] w-[18px]"
        type="button"
        aria-label="Previous Month"
        onClick={decreaseMonth}
      >
        <MaterialIcon className={iconClassName}>chevron_left</MaterialIcon>
        <span className="hidden">Previous Month</span>
      </button>
      <div
        data-testid="TestId_datepickerTitle"
        className="font-semibold text-slate-900"
      >
        {title}
      </div>
      <button
        className="mr-[2px] h-[18px] w-[18px]"
        id="test"
        type="button"
        aria-label="Next Month"
        onClick={increaseMonth}
      >
        <MaterialIcon className={iconClassName}>chevron_right</MaterialIcon>
        <span className="hidden">Next Month</span>
      </button>
    </div>
  );
}
