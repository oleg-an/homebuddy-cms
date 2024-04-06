import { SideModal, SideModalBody, SideModalFooter, useModalsActions } from 'shared/ui/SideModal';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { StepModel, StepSelectModel, StepSelectOptionModel } from 'entities/wizard';
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

const yesNoSelect: StepSelectModel = {
  fieldName: '',
  isMultiselect: false,
  options: [
    {
      title: 'Yes',
      value: 'yes',
      yesOkButtons: false,
      imageName: 'yes.svg',
    },
    {
      title: 'No',
      value: 'no',
      yesOkButtons: false,
      imageName: 'no.svg',
    },
  ],
};

const yesNoNotSureSelect: StepSelectModel = {
  fieldName: '',
  isMultiselect: false,
  options: [
    {
      title: 'Yes',
      value: 'yes',
      yesOkButtons: false,
      imageName: 'yes.svg',
    },
    {
      title: 'No',
      value: 'no',
      yesOkButtons: false,
      imageName: 'no.svg',
    },
    {
      title: 'Not sure',
      value: 'notSure',
      yesOkButtons: false,
      imageName: 'not-sure.svg',
    },
  ],
};

const newSelect: StepSelectModel = {
  fieldName: '',
  isMultiselect: false,
  options: [
    {
      title: '',
      value: '',
      yesOkButtons: false,
    },
  ],
};

const newSelectOption: StepSelectOptionModel = {
  title: '',
  value: '',
  yesOkButtons: false,
};

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
    <SideModal isLarge>
      <FormProvider {...methods}>
        <SideModalBody title={title}>
          <form onSubmit={onSubmit}>
            <div className="flex justify-between gap-4">
              <Input
                className="flex-1"
                title="Title"
                name="title"
                registerOptions={getRequiredValidation()}
              />
              <div>
                <div className="flex justify-end gap-1">
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
                <div className="mt-2">
                  <Button
                    size="small"
                    iconLeftName="text_fields"
                    variant="outline"
                    type="button"
                  >
                    Input
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
            <>
              {!!fields.length && (
                <div className="pb-5">
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
                </div>
              )}
            </>
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
