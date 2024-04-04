import { useGetWizard } from 'entities/wizard';
import { useParams } from 'react-router-dom';
import { Loader } from 'shared/ui/Loader';
import type { WizardModel } from 'entities/wizard';
import React from 'react';
import { WizardBuilder } from 'features/edit-wizard';

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

  return <WizardBuilder wizard={wizard} />;
}
