import type { Column } from 'shared/ui/Table';
import type { SelectOptionModel } from 'entities/wizard';

export function getStepCardSelectColumns(): Column<SelectOptionModel>[] {
  return [
    {
      label: 'Option name',
      key: 'optionName',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: ({ row }) => <td>{row.title}</td>,
    },
    {
      label: 'Redirect to step',
      key: 'redirect',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: ({ row }) => <td>...</td>,
    },
  ];
}
