import type { Column } from 'shared/ui/Table';
import type { SelectOptionModel } from 'entities/wizard';
import { Select } from 'shared/ui/Select';

export function getStepCardSelectColumns({
  onOptionClick,
}: {
  onOptionClick: () => void;
}): Column<SelectOptionModel>[] {
  return [
    {
      label: 'Title',
      key: 'title',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: ({ row }) => <td>{row.title}</td>,
    },
    {
      label: 'Redirect to',
      key: 'redirect',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: ({ row }) => (
        <td>
          <Select
            isSmall
            title=""
            options={[]}
            onChange={(id) => {
              console.log(id);
            }}
          />
        </td>
      ),
    },
  ];
}
