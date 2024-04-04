import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { SwitcherHookForm } from 'shared/ui/Switcher';
import { Divider } from 'shared/ui/Divider';
import { Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';
import type { SelectOptionModel, StepModel } from 'entities/wizard';
import { useState } from 'react';
import { getRequiredValidation } from 'features/edit-wizard/ui/utils';

import { getOptionsTableColumns } from './SelectColums';

interface StepCardProps {
  step: StepModel;
}

function assignIndexToOptions(options: SelectOptionModel[]) {
  return options.map((option, index) => ({
    ...option,
    index,
  }));
}

export function EditStepFormControls(props: StepCardProps) {
  const [step, setStep] = useState<StepModel>(props.step);
  const columns = getOptionsTableColumns();

  const addSelectHandler = () => {
    console.log(step);
    setStep({
      ...step,
      select: {
        options: [{ title: '', value: '' }],
        fieldName: '',
        isMultiselect: false,
      },
    });
  };

  const deleteSelectHandler = () => {
    setStep({
      ...step,
      select: undefined,
    });
  };

  const addOptionHandler = () => {
    if (!step.select) {
      return;
    }
    setStep({
      ...step,
      select: {
        ...step.select,
        options: [
          ...step.select.options,
          {
            title: '',
            value: '',
          },
        ],
      },
    });
  };

  const deleteOptionHandler = () => {};
  const addYesNoHandlerHandler = () => {};
  const addYesNoNotSureHandler = () => {};

  return (
    <>
      <Input
        className="flex-1"
        title="Title"
        name="title"
        registerOptions={getRequiredValidation()}
      />
      <Divider />
      {step.select ? (
        <>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Select field name</div>
              <Input
                className="input-sm w-[150px]"
                title=""
                name="select.fieldName"
                isErrorMessageHidden
                registerOptions={getRequiredValidation()}
              />
              <div className="ml-4 text-sm font-medium">Multiselect</div>
              <SwitcherHookForm name="select.isMultiSelect" />
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="medium"
                variant="outline"
                type="button"
                iconLeftName="add"
                onClick={addOptionHandler}
              >
                Add option
              </Button>
              <Button
                size="medium"
                variant="outline-danger"
                type="button"
                iconLeftName="delete"
                onClick={deleteSelectHandler}
              >
                Delete select
              </Button>
            </div>
          </div>
          <Table
            className="!m-0"
            variant="table-sm"
            data={assignIndexToOptions(step.select.options)}
            columns={columns}
            rowKey={uuidv4}
          />
        </>
      ) : (
        <div className="flex items-center justify-end">
          <div className="flex gap-2">
            <Button
              size="medium"
              variant="outline"
              type="button"
            >
              Yes / No
            </Button>
            <Button
              size="medium"
              variant="outline"
              type="button"
            >
              Yes / No / No sure
            </Button>
            <Button
              size="medium"
              variant="outline"
              type="button"
              onClick={addSelectHandler}
            >
              Select
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
