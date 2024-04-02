import { Button } from 'shared/ui/Button';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { mock } from 'pages/Wizards/mock';
import { useGetWizard } from 'pages/Wizards/query';

import { EditStep } from './EditStep';

let id = 0;

// getFormDefaultValues(stepsList)

export function EditWizard() {
  const getWizardQuery = useGetWizard({ id: 1 });

  console.log(getWizardQuery.data);

  const methods = useForm({
    defaultValues: {
      steps: mock,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'steps',
  });

  const onSubmit = methods.handleSubmit(async (form) => {
    console.log(form);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <div className="mb-4 flex justify-between gap-2">
          <div className="flex gap-2">
            <Button
              variant="primary"
              type="submit"
            >
              Update wizard
            </Button>
            <Button
              variant="outline"
              type="submit"
            >
              Cancel
            </Button>
          </div>
          <Button
            iconLeftName="add"
            variant="outline"
            type="button"
            onClick={() => {
              id += 1;
              // create new id step
            }}
          >
            Add step
          </Button>
        </div>
        <div>
          <div className="mr-8 flex w-full flex-col gap-5">
            {fields.map((step, index) => (
              <EditStep
                key={step.id}
                index={index}
                step={mock[index]}
              />
            ))}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
