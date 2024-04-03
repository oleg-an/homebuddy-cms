import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { SwitcherHookForm } from 'shared/ui/Switcher';
import { Divider } from 'shared/ui/Divider';
import { Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';

import { getOptionsTableColumns } from './SelectTableColums';
import type { SelectOptionModel, StepModel } from './models';

interface StepCardProps {
  step: StepModel;
}

function assignIndexToOptions(options: SelectOptionModel[]) {
  return options.map((option, index) => ({
    ...option,
    index,
  }));
}

export function EditStepFormControls({ step }: StepCardProps) {
  const columns = getOptionsTableColumns();
  const options = step.select?.options;

  return (
    <>
      <Input
        className="flex-1"
        title="Title"
        name="title"
      />
      <Divider />
      {options ? (
        <>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Select field name</div>
              <Input
                className="input-sm w-[150px]"
                title=""
                name="select.fieldName"
                isErrorMessageHidden
              />
              <div className="ml-4 text-sm font-medium">Multiselect</div>
              <div>
                <SwitcherHookForm name="select.isMultiSelect" />
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
            data={assignIndexToOptions(options)}
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
    </>
  );
}
