import { SideModal, SideModalBody, SideModalFooter, useModalsActions } from 'shared/ui/SideModal';
import { EditStepFormControls } from 'pages/Wizards/EditStepFormControls';
import { FormProvider, useForm } from 'react-hook-form';
import type { StepModel } from 'pages/Wizards/models';
import { Button } from 'shared/ui/Button';

interface EditStepModalProps {
  step: StepModel;
}

export function EditStepModal({ step }: EditStepModalProps) {
  const { close } = useModalsActions();
  const methods = useForm({
    defaultValues: {
      ...step,
    },
  });

  const onSubmit = methods.handleSubmit((form) => {
    console.log(form);
    close();
  });

  return (
    <SideModal isLarge>
      <FormProvider {...methods}>
        <SideModalBody title="Edit step">
          <form onSubmit={onSubmit}>
            <EditStepFormControls step={step} />
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
              className="w-full-screen shrink-0"
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </SideModalFooter>
      </FormProvider>
    </SideModal>
  );
}
