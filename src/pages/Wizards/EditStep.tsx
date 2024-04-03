import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { SwitcherHookForm } from 'shared/ui/Switcher';
import { Divider } from 'shared/ui/Divider';
import { Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';

import { getOptionsTableColumns } from './SelectTableColums';
import type { StepModel } from './models';

interface StepCardProps {
  step: StepModel;
  index: number;
}

export function EditStep({ step, index }: StepCardProps) {
  const columns = getOptionsTableColumns();
  const options = step.select?.options;

  return (
    <div className="shrink-0 gap-4 overflow-auto rounded-md border-[2px] border-slate-100 p-5">
      <div className="flex gap-4">
        <Input
          className="flex-1"
          title="Title"
          name={`steps.${index}.title`}
        />
        <Button
          iconLeftName="delete"
          size="medium"
          variant="outline-danger"
          type="button"
        >
          Delete step
        </Button>
      </div>
      <Divider className="!my-5" />
      {options ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Select field name</div>
              <Input
                className="input-sm w-[200px]"
                title=""
                name={`steps.${index}.select.fieldName`}
                isErrorMessageHidden
              />
              <div className="ml-4 text-sm font-medium">Multiselect</div>
              <div>
                <SwitcherHookForm name={`steps.${index}.select.isMultiSelect`} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="small"
                variant="outline"
                type="button"
                iconLeftName="add"
              >
                Add option
              </Button>
              <Button
                size="small"
                variant="outline-danger"
                type="button"
                iconLeftName="delete"
              >
                Delete select
              </Button>
            </div>
          </div>
          <Table
            className="!m-0"
            variant="table-sm"
            data={options}
            columns={columns}
            rowKey={uuidv4}
          />
        </>
      ) : (
        <div className="flex items-center justify-end">
          <div className="flex gap-2">
            <Button
              size="small"
              variant="outline"
              type="button"
            >
              Yes / No
            </Button>
            <Button
              size="small"
              variant="outline"
              type="button"
            >
              Yes / No / No sure
            </Button>
            <Button
              size="small"
              variant="outline"
              type="button"
            >
              Select
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
