import { SideModal, SideModalBody, SideModalFooter, useModalsActions } from 'shared/ui/SideModal';
import { FormProvider, useForm } from 'react-hook-form';
import type { StepModel } from 'pages/Wizards/models';
import { Button } from 'shared/ui/Button';

import { EditStepFormControls } from './EditStepFormControls';

interface EditStepModalProps {
  step: StepModel;
}

// добавить событие в модалку
export function EditStepModal({ step }: EditStepModalProps) {
  const { close } = useModalsActions();
  const methods = useForm({
    defaultValues: {
      title: step.title,
      select: step.select,
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
              Next
            </Button>
          </div>
        </SideModalFooter>
      </FormProvider>
    </SideModal>
  );
}
