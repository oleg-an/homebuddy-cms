import { type Column, Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';
import type { SelectOptionModel, StepModel } from 'entities/wizard';
import { type Option, Select } from 'shared/ui/Select';
import { useState } from 'react';

const notSelectedStepOption = {
  id: 'notSelected',
  text: 'Not selected',
};

interface StepsSelectProps {
  options: Option[];
}

function StepsSelect({ options }: StepsSelectProps) {
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
        console.log(id);
        setSelectedOptionId(id);
      }}
    />
  );
}

export function getColumns({
  redirectToStepClick,
  steps,
}: {
  redirectToStepClick: () => void;
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
          <StepsSelect options={options} />
        </td>
      ),
    },
  ];
}

interface StepCardSelect {
  options: SelectOptionModel[];
  steps: StepModel[];
}

export function StepCardSelectOptions({ options, steps }: StepCardSelect) {
  const columns = getColumns({ steps, redirectToStepClick: () => {} });

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
