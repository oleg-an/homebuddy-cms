import type { StepModel } from 'pages/Wizards/models';
import { Button } from 'shared/ui/Button';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

interface StepCardProps {
  step: StepModel;
  onSaveClick: () => void;
}

export function StepCard({ step, onSaveClick }: StepCardProps) {
  return (
    <>
      <div className="mb-4 w-[500px] rounded-md border-[2px] border-slate-100 p-4">
        <div className="flex justify-between gap-4">
          <div className="truncate font-medium">{step.title}</div>
          <div className="flex gap-2">
            <Button
              className="w-[10px]"
              size="small"
              variant="outline"
              onClick={onSaveClick}
            >
              <MaterialIcon className="text-base">edit</MaterialIcon>
            </Button>
            <Button
              className="w-[10px]"
              size="small"
              variant="outline-danger"
            >
              <MaterialIcon className="text-base">delete</MaterialIcon>
            </Button>
          </div>
        </div>
        {step.select && (
          <div className="mt-4">
            <div className="text-sm font-bold">Select options</div>
            {step.select.options.map((option, index) => (
              <div
                key={index}
                className="mb-1"
              >
                {option.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
