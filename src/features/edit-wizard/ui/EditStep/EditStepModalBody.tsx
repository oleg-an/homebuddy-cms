import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { StepModel } from 'entities/wizard';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Divider } from 'shared/ui/Divider';
import { SwitcherHookForm } from 'shared/ui/Switcher';
import { Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';
import classNames from 'classnames';

import { getRequiredValidation } from '../utils';

import { getOptionsTableColumns } from './getOptionsTableColumns';
import style from './EditStepModal.module.scss';
import { newSelect, newSelectOption, yesNoNotSureSelect, yesNoSelect } from './const';

interface EditStepModalProps {
  step: StepModel;
  onEdit: (step: StepModel) => void;
  onClose: () => void;
}

export function EditStepModalBody({ step, onEdit, onClose }: EditStepModalProps) {
  const methods = useForm({
    defaultValues: {
      title: step.title,
      select: step.select,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'select.options',
  });
  const onSubmit = methods.handleSubmit(({ title, select }) => {
    onEdit({ title, select, id: step.id });
    onClose();
  });
  const columns = getOptionsTableColumns({
    onDeleteSelectOption: (index) => remove(index),
    onSelectIcon: () => {
      // open(<SelectIconModal />);
    },
  });
  const addOptionHandler = () => {
    append(newSelectOption);
  };
  const addSelectHandler = () => {
    methods.reset({
      select: newSelect,
    });
  };
  const deleteSelectHandler = () => {
    methods.reset({
      select: undefined,
    });
  };
  const addYesNoHandlerHandler = () => {
    methods.reset({
      select: yesNoSelect,
    });
  };
  const addYesNoNotSureHandler = () => {
    methods.reset({
      select: yesNoNotSureSelect,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-full flex-col justify-between"
        onSubmit={onSubmit}
      >
        <div className={classNames('flex-1', style.scroll)}>
          <div className="mt-4 flex flex-1 justify-between gap-4">
            <Input
              className="flex-1"
              title="Title"
              name="title"
              registerOptions={getRequiredValidation()}
            />
            <div className="flex justify-end gap-2">
              <Button
                iconLeftName="radio_button_checked"
                size="small"
                variant="outline"
                type="button"
                onClick={addSelectHandler}
                disabled={!!fields.length}
              >
                Select
              </Button>
              <Button
                iconLeftName="radio_button_checked"
                size="small"
                variant="outline"
                type="button"
                onClick={addYesNoHandlerHandler}
                disabled={!!fields.length}
              >
                Yes/No
              </Button>
              <Button
                iconLeftName="radio_button_checked"
                size="small"
                variant="outline"
                type="button"
                onClick={addYesNoNotSureHandler}
                disabled={!!fields.length}
              >
                Yes/No/No sure
              </Button>
            </div>
          </div>
          <Divider />
          {!!fields.length && (
            <div>
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
                  <SwitcherHookForm name="select.isMultiselect" />
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
                data={fields}
                columns={columns}
                rowKey={uuidv4}
              />
            </div>
          )}
        </div>
        <div className="shrink-0">
          <Divider className="my-2" />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              className="w-full-screen w-[150px] shrink-0"
              type="submit"
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
