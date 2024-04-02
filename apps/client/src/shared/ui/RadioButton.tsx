import classNames from 'classnames';
import type { DataAttributes } from 'shared/lib/data-auto-test';

interface RadioButtonProps {
  onClick: () => void;
  isChecked: boolean;
  checkedText: string;
  unCheckedText: string;
  className?: string;
  attributes?: DataAttributes['attributes'];
}

export function RadioButton({
  onClick,
  isChecked,
  attributes,
  checkedText,
  unCheckedText,
  className,
}: RadioButtonProps) {
  return (
    <div
      className={classNames(className, 'select-none', {
        'pointer-events-none': isChecked,
      })}
      onClick={onClick}
      {...attributes}
    >
      <label className="cursor-pointer">
        <div className="flex items-center">
          <svg
            className="shrink-0"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="7.5"
              stroke="#E2E6E9"
            />
            {isChecked && (
              <circle
                cx="8"
                cy="8"
                r="4"
                fill="#2F55EB"
              />
            )}
          </svg>
          <div className="ml-2 font-medium">{isChecked ? checkedText : unCheckedText}</div>
        </div>
      </label>
    </div>
  );
}
