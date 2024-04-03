import { Table } from 'shared/ui/Table';
import { useGetWizardList } from 'pages/Wizards/query';
import { Loader } from 'shared/ui/Loader';

export function WizardList() {
  const getWizardListQuery = useGetWizardList();

  if (getWizardListQuery.isFetching) {
    return <Loader className="mt-20 flex justify-center" />;
  }

  if (getWizardListQuery.isSuccess) {
    return <Table data={getWizardListQuery.data} />;
  }

  return <></>;
}
