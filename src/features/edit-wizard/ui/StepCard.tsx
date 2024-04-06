import type { StepModel } from 'entities/wizard';
import { Button } from 'shared/ui/Button';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

import type { redirectToStepClickType } from './StepCardSelect';
import { StepCardSelectOptions } from './StepCardSelect';

interface StepCardProps {
  steps: StepModel[];
  step: StepModel;
  onEditClick: () => void;
  onDeleteClick: (stepId: string) => void;
  onStepModified: (step: StepModel) => void;
}

export function StepCard({ step, steps, onEditClick, onDeleteClick, onStepModified }: StepCardProps) {
  const redirectToStepClickHandler: redirectToStepClickType = ({ optionIndex, redirectStepId }) => {
    if (!step.select) {
      return;
    }
    const options = step.select.options.map((option, index) => {
      if (index !== optionIndex) {
        return option;
      }

      return {
        ...option,
        redirectStepId,
      };
    });

    onStepModified({
      ...step,
      select: {
        ...step.select,
        options,
      },
    });
  };

  return (
    <div className="mb-4 flex w-[700px] justify-between gap-4 rounded-md border-[2px] border-slate-100 p-6">
      <div className="flex-1">
        <div className="flex justify-between gap-4">
          <div className="truncate font-medium">{step.title}</div>
          <div className="flex gap-2">
            <Button
              className="w-[10px]"
              size="small"
              variant="outline"
              onClick={onEditClick}
            >
              <MaterialIcon className="text-base">edit</MaterialIcon>
            </Button>
            <Button
              className="w-[10px]"
              size="small"
              variant="outline-danger"
              onClick={() => onDeleteClick(step.id)}
            >
              <MaterialIcon className="text-base">delete</MaterialIcon>
            </Button>
          </div>
        </div>
        {step.select && (
          <StepCardSelectOptions
            options={step.select.options}
            steps={steps}
            redirectToStepClick={redirectToStepClickHandler}
          />
        )}
      </div>
      <div>
        <MaterialIcon className="handle mt-1 cursor-pointer text-slate-700">open_with</MaterialIcon>
      </div>
    </div>
  );
}
