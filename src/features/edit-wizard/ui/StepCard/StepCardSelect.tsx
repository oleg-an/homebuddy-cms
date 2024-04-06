import { type Column, Table } from 'shared/ui/Table';
import { uuidv4 } from 'shared/lib/uuidv4';
import type { StepSelectOptionModel, StepModel } from 'entities/wizard';
import { type Option, Select } from 'shared/ui/Select';
import { useState } from 'react';
import { useHidable } from 'shared/lib/hooks';
import { Button } from 'shared/ui/Button';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { ModalDialog } from 'shared/ui/ModalDialog';

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
  const editDialog = useHidable();
  const title = selectOptions.find((x) => x.id === stepSelect.redirectStepId)?.text || '';

  return (
    <div className="inline-block w-[250px]">
      {editDialog.isShown && (
        <ModalDialog
          className="w-[600px]"
          isOpen={editDialog.isShown}
          onClose={editDialog.hide}
          title="Redirect to"
        >
          <Select
            className="mt-4 w-full"
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
        </ModalDialog>
      )}
      <div className="flex items-center justify-end gap-2">
        <div className="max-w-[200px] truncate">{title}</div>
        <Button
          size="small"
          variant="outline"
          className="w-[30px]"
          onClick={() => {
            editDialog.show();
          }}
        >
          <MaterialIcon className="text-base">edit</MaterialIcon>
        </Button>
      </div>
    </div>
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
        hasVerticalScroll
        className="!mt-0 max-h-[250px]"
        variant="table-sm"
        data={options}
        columns={columns}
        rowKey={uuidv4}
      />
    </div>
  );
}
