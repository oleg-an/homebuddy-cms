import React, { useState } from 'react';
import type { StepModel, WizardModel } from 'entities/wizard';
import { useDeleteWizard } from 'entities/wizard';
import { useCreateWizard, useUpdateWizard } from 'entities/wizard';
import { ReactSortable } from 'react-sortablejs';
import { Button } from 'shared/ui/Button';
import { useHidable } from 'shared/lib/hooks';

import { getNewStep } from './utils';
import { EditStepModal } from './EditStep';
import { StepCard } from './StepCard';

interface WizardBuilderProps {
  wizard: WizardModel | null;
}

export function WizardBuilder({ wizard }: WizardBuilderProps) {
  const [isNewStep, setIsNewStep] = useState(false);
  const saveWizardQuery = !wizard ? useCreateWizard() : useUpdateWizard(wizard._id);
  const deleteWizardQuery = useDeleteWizard(wizard?._id || '0');
  const [steps, setSteps] = useState<StepModel[]>(wizard ? wizard.steps : []);
  const editDialog = useHidable();
  const [editableStep, setEditableStep] = useState<StepModel>(getNewStep());
  const editStepHandler = (step: StepModel) => {
    setEditableStep(step);
    setIsNewStep(false);
    editDialog.show();
  };

  const createStepHandler = () => {
    setEditableStep(getNewStep());
    setIsNewStep(true);
    editDialog.show();
  };

  const deleteStepHandler = (stepId: string) => {
    setSteps(steps.filter((x) => x.id !== stepId));
  };

  const saveWizardHandler = () => {
    saveWizardQuery.mutate(steps, {
      onSuccess: () => {},
    });
  };

  const stepModifiedHandler = (step: StepModel) => {
    if (isNewStep) {
      setSteps([...steps, step]);

      return;
    }

    setSteps(steps.map((item) => (item.id !== step.id ? item : step)));
  };

  const deleteWizardHandler = () => {
    deleteWizardQuery.mutate();
  };
  const closeStepModalHandler = () => {
    editDialog.hide();
    setIsNewStep(false);
  };

  return (
    <>
      <EditStepModal
        isNewStep={isNewStep}
        onClose={closeStepModalHandler}
        isOpen={editDialog.isShown}
        step={editableStep}
        onEdit={stepModifiedHandler}
      />
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
                onStepModified={stepModifiedHandler}
              />
            ))}
          </ReactSortable>
        </div>
        <div className="fixed right-10 mb-4 flex flex-col gap-4">
          {!!wizard && (
            <Button
              type="button"
              variant="outline-danger"
              onClick={deleteWizardHandler}
              loading={deleteWizardQuery.isLoading}
            >
              Delete wizard
            </Button>
          )}
          <Button
            variant="primary"
            type="submit"
            onClick={saveWizardHandler}
            disabled={!steps.length}
            loading={saveWizardQuery.isLoading}
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
