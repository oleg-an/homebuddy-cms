import React, { useState } from 'react';
import type { StepModel, WizardModel } from 'entities/wizard';
import { useCreateWizard } from 'entities/wizard';
import { useUpdateWizard } from 'entities/wizard';
import { uuidv4 } from 'shared/lib/uuidv4';
import { ReactSortable } from 'react-sortablejs';
import { Button } from 'shared/ui/Button';
import { useHidable } from 'shared/lib/hooks';

import { EditStepModal, EditStepModalBody } from './EditStep';
import { StepCard } from './StepCard';

interface WizardBuilderProps {
  wizard: WizardModel | null;
}

function getNewStep() {
  return {
    title: '',
    id: uuidv4(),
  };
}

export function WizardBuilder({ wizard }: WizardBuilderProps) {
  const saveWizardQuery = !wizard ? useCreateWizard() : useUpdateWizard(wizard._id);
  const [steps, setSteps] = useState<StepModel[]>(wizard ? wizard.steps : []);
  const editDialog = useHidable();
  const [editableStep, setEditableStep] = useState<StepModel>();
  const editStepHandler = (step: StepModel) => {
    setEditableStep(step);
    editDialog.show();
  };

  const createStepHandler = () => {
    /*
    open(
      <EditStepModal
        title="Create step"
        step={getNewStep()}
        onEdit={(step) => {
          setSteps([...steps, step]);
        }}
      />
    );
     */
  };

  const deleteStepHandler = (stepId: string) => {
    setSteps(steps.filter((x) => x.id !== stepId));
  };

  const saveWizardHandler = () => {
    console.log(steps);
    // update wizard
  };

  const onStepModified = (step: StepModel) => {
    const updatedSteps = steps.map((item) => (item.id !== step.id ? item : step));

    setSteps(updatedSteps);
  };

  return (
    <>
      <EditStepModal
        className="w-[1000px]	"
        title="Edit step"
        onClose={editDialog.hide}
        isOpen={editDialog.isShown}
      >
        {editableStep && (
          <EditStepModalBody
            step={editableStep}
            onEdit={onStepModified}
            onClose={editDialog.hide}
          />
        )}
      </EditStepModal>
      <div className="flex justify-between">
        <div className="flex-1">
          <ReactSortable
            handle=".handle"
            animation={200}
            list={steps}
            setList={setSteps}
          >
            {steps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                steps={steps}
                onEditClick={() => editStepHandler(step)}
                onDeleteClick={deleteStepHandler}
                onStepModified={onStepModified}
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
    </>
  );
}
