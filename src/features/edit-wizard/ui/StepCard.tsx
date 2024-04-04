import type { StepModel } from 'entities/wizard';
import { Button } from 'shared/ui/Button';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';

import { getStepCardSelectColumns } from './getStepCardSelectColumns';

interface StepCardProps {
  step: StepModel;
  onEditClick: () => void;
  onDeleteClick: (stepId: string) => void;
}

export function StepCard({ step, onEditClick, onDeleteClick }: StepCardProps) {
  return (
    <div className="mb-4 w-[700px] rounded-md border-[2px] border-slate-100 p-6">
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
        <div className="mt-4">
          <div className="mb-2 text-sm font-bold">Select options</div>
          <Table
            className="!mt-0"
            variant="table-sm"
            data={step.select.options}
            columns={getStepCardSelectColumns({
              onOptionClick: () => {},
            })}
            rowKey={uuidv4}
          />
        </div>
      )}
    </div>
  );
}
