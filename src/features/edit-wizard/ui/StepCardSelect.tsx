import { type Column, Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';
import type { SelectOptionModel, StepModel } from 'entities/wizard';
import { type Option, Select } from 'shared/ui/Select';
import { useState } from 'react';

const notSelectedStepOption = {
  id: 'notSelected',
  text: 'Not selected',
};

export type redirectToStepClickType = ({
  redirectStepId,
  optionIndex,
}: {
  optionIndex: number;
  redirectStepId: string;
}) => void;

interface StepsSelectProps {
  options: Option[];
  onChange: (id: string) => void;
}

function StepsSelect({ options, onChange }: StepsSelectProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(notSelectedStepOption.id);

  return (
    <Select
      wrapperClass="inline-block"
      className="w-[250px]"
      dropdownClassName="text-left"
      selectedOptionId={selectedOptionId}
      isSmall
      title=""
      options={options}
      onChange={(id) => {
        setSelectedOptionId(id);
        onChange(id);
      }}
    />
  );
}

export function getColumns({
  redirectToStepClick,
  steps,
}: {
  redirectToStepClick: redirectToStepClickType;
  steps: StepModel[];
}): Column<SelectOptionModel>[] {
  const options = [
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
        <td className="text-right">
          <StepsSelect
            options={options}
            onChange={(id) => redirectToStepClick({ optionIndex: row.index, redirectStepId: id })}
          />
        </td>
      ),
    },
  ];
}

interface StepCardSelect {
  options: SelectOptionModel[];
  steps: StepModel[];
  redirectToStepClick: redirectToStepClickType;
}

export function StepCardSelectOptions({ options, steps, redirectToStepClick }: StepCardSelect) {
  const columns = getColumns({ steps, redirectToStepClick });

  return (
    <div className="mt-4">
      <div className="mb-2 text-sm font-bold">Select options</div>
      <Table
        className="!mt-0"
        variant="table-sm"
        data={options}
        columns={columns}
        rowKey={uuidv4}
      />
    </div>
  );
}
