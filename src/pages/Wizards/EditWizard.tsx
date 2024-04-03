import { Button } from 'shared/ui/Button';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useGetWizard } from 'pages/Wizards/query';
import { useParams } from 'react-router-dom';
import { Loader } from 'shared/ui/Loader';
import type { WizardModel } from 'pages/Wizards/models';
import React, { useState } from 'react';
import { ProgressBar } from 'shared/ui/ProgressBar';

import { EditStep } from './EditStep';

export function EditWizard() {
  const { id } = useParams<{ id: string }>();
  const getWizardQuery = useGetWizard({ id });

  if (getWizardQuery.isFetching) {
    return <Loader className="mt-20 flex justify-center" />;
  }

  if (getWizardQuery.isSuccess) {
    return <EditWizardBody wizard={getWizardQuery.data} />;
  }

  return <></>;
}

interface EditWizardBodyProps {
  wizard: WizardModel;
}

export function EditWizardBody({ wizard }: EditWizardBodyProps) {
  // const updateWizardQuery = useUpdateWizard();
  const [stepNumber, setStepNumber] = useState(1);
  const methods = useForm({
    defaultValues: {
      steps: wizard.steps,
    },
  });

  // , append, remove
  const { fields } = useFieldArray({
    control: methods.control,
    name: 'steps',
  });

  const onSubmit = methods.handleSubmit((form) => {
    console.log(form);
  });

  return (
    <>
      <div className="flex justify-center">
        <ProgressBar
          className="mb-14"
          items={[
            { text: '1', title: 'Create steps', id: '1' },
            { text: '2', title: 'Connect steps', id: '2' },
          ]}
          stepNumber={stepNumber}
        />
      </div>
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
                type="button"
              >
                Cancel
              </Button>
            </div>
            <Button
              iconLeftName="add"
              variant="outline"
              type="button"
              onClick={() => {
                // create new id step
              }}
            >
              Add step
            </Button>
          </div>
          <div className="mr-8 flex w-full flex-col gap-5">
            {fields.map((step, index) => (
              <EditStep
                key={step.id}
                stepIndex={index}
                step={step}
              />
            ))}
          </div>
        </form>
      </FormProvider>
    </>
  );
}
