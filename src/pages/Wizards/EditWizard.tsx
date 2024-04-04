import { Button } from 'shared/ui/Button';
import { useGetWizard } from 'pages/Wizards/query';
import { useParams } from 'react-router-dom';
import { Loader } from 'shared/ui/Loader';
import type { StepModel, WizardModel } from 'pages/Wizards/models';
import React, { useState } from 'react';
import { StepCard } from 'pages/Wizards/StepCard';
import { ReactSortable } from 'react-sortablejs';
import { useModalsActions } from 'shared/ui/SideModal';
import { uuidv4 } from 'shared/lib/uuidv4';

import { EditStepModal } from './EditStep';

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
  const { open } = useModalsActions();

  const onEditStepHandler = (step: StepModel) => {
    open(
      <EditStepModal
        title="Edit step"
        step={step}
        onEdit={(step) => {
          setSteps(steps.map((value) => (value.id === step.id ? step : value)));
        }}
      />
    );
  };

  const onCreateStepHandler = () => {
    open(
      <EditStepModal
        title="Create step"
        step={{ title: '', id: uuidv4() }}
        onEdit={(step) => {
          setSteps([...steps, step]);
        }}
      />
    );
  };

  const onDeleteStepHandler = (stepId: string) => {
    setSteps(steps.filter((x) => x.id !== stepId));
  };

  const onSaveWizardHandler = () => {
    console.log(steps);
    // update wizard
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <ReactSortable
          animation={200}
          list={steps}
          setList={setSteps}
        >
          {steps.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              onEditClick={() => onEditStepHandler(step)}
              onDeleteClick={onDeleteStepHandler}
            />
          ))}
        </ReactSortable>
      </div>
      <div className="fixed right-8 mb-4 flex justify-between gap-5">
        <Button
          variant="primary"
          type="submit"
          onClick={onSaveWizardHandler}
        >
          Update wizard
        </Button>
        <Button
          iconLeftName="add"
          variant="outline"
          type="button"
          onClick={onCreateStepHandler}
        >
          Add step
        </Button>
      </div>
    </div>
  );
}
