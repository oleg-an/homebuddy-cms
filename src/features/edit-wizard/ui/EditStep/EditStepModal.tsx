import { SideModal, SideModalBody, SideModalFooter, useModalsActions } from 'shared/ui/SideModal';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { StepModel } from 'entities/wizard';
import { Button } from 'shared/ui/Button';
import { Input } from 'shared/ui/Input';
import { Divider } from 'shared/ui/Divider';
import { SwitcherHookForm } from 'shared/ui/Switcher';
import { Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';

import { getRequiredValidation } from '../utils';

import { getOptionsTableColumns } from './getOptionsTableColumns';

interface EditStepModalProps {
  title: string;
  step: StepModel;
  onEdit: (step: StepModel) => void;
}

export function EditStepModal({ step, onEdit, title }: EditStepModalProps) {
  const { close } = useModalsActions();
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
    close();
  });

  const columns = getOptionsTableColumns({ onDeleteSelectOption: (index) => remove(index) });
  const addSelectHandler = () => {
    methods.reset({
      select: {
        fieldName: '',
        isMultiselect: false,
        options: [
          {
            title: '',
            value: '',
          },
        ],
      },
    });
  };
  const deleteSelectHandler = () => {
    methods.reset({
      select: undefined,
    });
  };
  const addOptionHandler = () => {
    append({
      title: '',
      value: '',
      yesOkButtons: false,
    });
  };

  const addYesNoHandlerHandler = () => {
    methods.reset({
      select: {
        fieldName: '',
        isMultiselect: false,
        options: [
          {
            title: 'Yes',
            value: 'yes',
          },
          {
            title: 'No',
            value: 'no',
          },
        ],
      },
    });
  };
  const addYesNoNotSureHandler = () => {
    methods.reset({
      select: {
        fieldName: '',
        isMultiselect: false,
        options: [
          {
            title: 'Yes',
            value: 'yes',
          },
          {
            title: 'No',
            value: 'no',
          },
          {
            title: 'Not sure',
            value: 'notSure',
          },
        ],
      },
    });
  };

  return (
    <SideModal isLarge>
      <FormProvider {...methods}>
        <SideModalBody title={title}>
          <form onSubmit={onSubmit}>
            <Input
              className="flex-1"
              title="Title"
              name="title"
              registerOptions={getRequiredValidation()}
            />
            <Divider />
            <div className="pb-5">
              {fields.length ? (
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
                    data={fields}
                    columns={columns}
                    rowKey={uuidv4}
                  />
                </>
              ) : (
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="medium"
                    variant="outline"
                    type="button"
                    onClick={addYesNoHandlerHandler}
                  >
                    Yes / No
                  </Button>
                  <Button
                    size="medium"
                    variant="outline"
                    type="button"
                    onClick={addYesNoNotSureHandler}
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
              )}
            </div>
          </form>
        </SideModalBody>
        <SideModalFooter>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={close}
              variant="outline"
            >
              Close
            </Button>
            <Button
              className="w-full-screen w-[150px] shrink-0"
              onClick={onSubmit}
            >
              Next
            </Button>
          </div>
        </SideModalFooter>
      </FormProvider>
    </SideModal>
  );
}
