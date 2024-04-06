import { type Column, Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';
import type { StepSelectOptionModel, StepModel } from 'entities/wizard';
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
  stepSelect: StepSelectOptionModel;
  selectOptions: Option[];
  onChange: (id: string) => void;
}

function StepsSelect({ selectOptions, onChange, stepSelect }: StepsSelectProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(stepSelect.redirectStepId || notSelectedStepOption.id);

  return (
    <Select
      wrapperClass="inline-block"
      className="w-[250px]"
      dropdownClassName="text-left"
      selectedOptionId={selectedOptionId}
      isSmall
      title=""
      options={selectOptions}
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
}): Column<StepSelectOptionModel>[] {
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
      columnCell: ({ row }, optionIndex) => (
        <td className="text-right">
          <StepsSelect
            selectOptions={options}
            onChange={(id) => {
              redirectToStepClick({ optionIndex, redirectStepId: id });
            }}
            stepSelect={row}
          />
        </td>
      ),
    },
  ];
}

interface StepCardSelect {
  options: StepSelectOptionModel[];
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
