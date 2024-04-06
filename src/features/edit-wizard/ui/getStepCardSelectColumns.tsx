import type { Column } from 'shared/ui/Table';
import type { SelectOptionModel, StepModel } from 'entities/wizard';
import type { Option } from 'shared/ui/Select';
import { Select } from 'shared/ui/Select';
import { useState } from 'react';

const notSelectedStepOption = {
  id: 'notSelected',
  text: 'Not selected',
};

export function getStepCardSelectColumns({
  onOptionClick,
  steps,
}: {
  onOptionClick: () => void;
  steps: StepModel[];
}): Column<SelectOptionModel>[] {
  const [selectedOptionId, setSelectedOptionId] = useState(notSelectedStepOption.id);
  const options: Option[] = [
    notSelectedStepOption,
    ...steps.map(({ title, id }) => ({
      text: title,
      id: id.toString(),
    })),
  ];

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
      headerCell: ({ value }) => <th className="text-right">{value}</th>,
      columnCell: ({ row }) => (
        <td className="w-[250px] text-right">
          <Select
            dropdownClassName="text-left"
            selectedOptionId={selectedOptionId}
            isSmall
            title=""
            options={options}
            onChange={(id) => {
              console.log(id);
            }}
          />
        </td>
      ),
    },
  ];
}
