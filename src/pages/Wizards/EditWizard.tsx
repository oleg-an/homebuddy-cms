import { Button } from 'shared/ui/Button';
import { useGetWizard } from 'pages/Wizards/query';
import { useParams } from 'react-router-dom';
import { Loader } from 'shared/ui/Loader';
import type { StepModel, WizardModel } from 'pages/Wizards/models';
import React, { useState } from 'react';
import { StepCard } from 'pages/Wizards/StepCard';
import { uuidv4 } from 'shared/lib/uuidv4';

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
  const [steps, setSteps] = useState<StepModel[]>(wizard.steps);

  return (
    <div className="flex justify-between">
      <div className="mr-8 flex w-full flex-col gap-5">
        {steps.map((step) => (
          <StepCard
            key={step.id}
            step={step}
          />
        ))}
      </div>
      <div className="fixed right-8 mb-4 flex justify-between gap-5">
        <Button
          variant="primary"
          type="submit"
        >
          Update wizard
        </Button>
        <Button
          iconLeftName="add"
          variant="outline"
          type="button"
          onClick={() => {
            // create new id step
            setSteps([
              ...steps,
              {
                title: '',
                id: uuidv4(),
              },
            ]);
          }}
        >
          Add step
        </Button>
      </div>
    </div>
  );
}
