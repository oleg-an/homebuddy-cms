import classNames from 'classnames';
import { useMemo } from 'react';
import type { PasswordRulesKeys } from 'entities/password';
import { PasswordValidationLabels } from 'entities/password';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { getKeys } from 'shared/lib/object';

interface PasswordRulesProps {
  className?: string;
  passwordRules: Array<PasswordRulesKeys> | null;
}

export function PasswordRules({ className, passwordRules }: PasswordRulesProps) {
  const rules = getKeys(PasswordValidationLabels);

  const unfulfilledRulesMap: Record<PasswordRulesKeys, boolean> = useMemo(() => {
    if (!passwordRules) {
      return {} as Record<PasswordRulesKeys, boolean>;
    }

    return passwordRules.reduce((acc, rule) => {
      return { ...acc, [rule]: true };
    }, {}) as Record<PasswordRulesKeys, boolean>;
  }, [passwordRules]);

  return (
    <ul className={classNames(className, 'flex flex-col gap-3')}>
      {rules.map((ruleKey) => {
        const isUnfulfilled = !passwordRules || unfulfilledRulesMap[ruleKey];
        const colorClass = isUnfulfilled ? 'text-slate-400' : 'text-deep-blue-500';
        const icon = isUnfulfilled ? 'radio_button_unchecked' : 'check_circle_outline';

        return (
          <li
            key={ruleKey}
            className={classNames('flex items-center gap-2 text-[12px] ease-in', colorClass)}
          >
            <MaterialIcon className="text-[15px]">{icon}</MaterialIcon>
            <span>{PasswordValidationLabels[ruleKey]}</span>
          </li>
        );
      })}
    </ul>
  );
}
