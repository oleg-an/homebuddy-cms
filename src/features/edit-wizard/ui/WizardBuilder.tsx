import React, { useState } from 'react';
import type { StepModel, WizardModel } from 'entities/wizard';
import { useCreateWizard } from 'entities/wizard';
import { useUpdateWizard } from 'entities/wizard';
import { useModalsActions } from 'shared/ui/SideModal';
import { uuidv4 } from 'shared/lib/uuidv4';
import { ReactSortable } from 'react-sortablejs';
import { Button } from 'shared/ui/Button';

import { EditStepModal } from './EditStepModal';
import { StepCard } from './StepCard';

interface WizardBuilderProps {
  wizard?: WizardModel;
}

export function WizardBuilder({ wizard }: WizardBuilderProps) {
  const updateWizardQuery = !wizard ? useCreateWizard() : useUpdateWizard(wizard._id);
  const [steps, setSteps] = useState<StepModel[]>(wizard ? wizard.steps : []);
  const { open } = useModalsActions();

  const editStepHandler = (step: StepModel) => {
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

  const createStepHandler = () => {
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

  const deleteStepHandler = (stepId: string) => {
    setSteps(steps.filter((x) => x.id !== stepId));
  };

  const saveWizardHandler = () => {
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
              onEditClick={() => editStepHandler(step)}
              onDeleteClick={deleteStepHandler}
            />
          ))}
        </ReactSortable>
      </div>
      <div className="fixed right-10 mb-4 flex flex-col gap-4">
        <Button
          variant="primary"
          type="submit"
          onClick={saveWizardHandler}
          disabled={!steps.length}
        >
          {!wizard ? 'Create wizard' : 'Update wizard'}
        </Button>
        <Button
          iconLeftName="add"
          variant="outline"
          type="button"
          onClick={createStepHandler}
        >
          Add step
        </Button>
      </div>
    </div>
  );
}
