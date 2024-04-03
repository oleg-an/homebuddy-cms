import { useGetWizardList } from 'pages/Wizards/query';
import { Loader } from 'shared/ui/Loader';
import type { Column } from 'shared/ui/Table';
import { Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';
import type { WizardModel } from 'pages/Wizards/models';
import { useHistory } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { pathToUrl } from 'shared/lib/router';
import { Button } from 'shared/ui/Button';

function getColumns(): Column<WizardModel>[] {
  return [
    {
      label: 'Id',
      key: 'id',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: ({ row: { _id } }) => <td>{_id}</td>,
    },
  ];
}

export function WizardList() {
  const getWizardListQuery = useGetWizardList();
  const columns = getColumns();
  const history = useHistory();

  if (getWizardListQuery.isFetching) {
    return <Loader className="mt-20 flex justify-center" />;
  }

  if (getWizardListQuery.isSuccess) {
    return (
      <>
        <div className="flex justify-end">
          <Button
            variant="outline"
            iconLeftName="plus"
          >
            Create new wizard
          </Button>
        </div>
        <Table
          data={getWizardListQuery.data}
          columns={columns}
          rowKey={uuidv4}
          hasRowCursorPointer
          onRowClick={({ _id }) => {
            history.push(pathToUrl(pageRoutes.app.wizard, { id: _id }));
          }}
        />
      </>
    );
  }

  return <></>;
}
