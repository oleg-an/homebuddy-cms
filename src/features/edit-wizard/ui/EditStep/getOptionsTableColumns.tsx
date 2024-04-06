import type { Column } from 'shared/ui/Table';
import type { StepSelectOptionModel } from 'entities/wizard';
import { Input } from 'shared/ui/Input';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Button } from 'shared/ui/Button';
import { noop } from 'shared/lib/functions';
import { SwitcherHookForm } from 'shared/ui/Switcher';

import { getRequiredValidation } from '../utils';

function getIconUrl(iconName: string) {
  return `https://wizard-bf8f.restdb.io/media/${iconName}`;
}

export function getOptionsTableColumns({
  onDeleteSelectOption,
  onSelectIcon,
}: {
  onDeleteSelectOption: (index: number) => void;
  onSelectIcon: () => void;
}): Column<StepSelectOptionModel>[] {
  return [
    {
      label: 'Icon',
      key: 'icon',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: ({ row }) => (
        <td onClick={onSelectIcon}>
          <Button
            variant="outline"
            size="medium"
            type="button"
            className="w-10 !bg-transparent"
          >
            {row.imageName ? (
              <img
                alt=""
                className="inline h-10 w-10 cursor-pointer"
                src={getIconUrl(row.imageName)}
                onClick={noop}
              />
            ) : (
              <MaterialIcon className="text-lg">add_photo_alternate</MaterialIcon>
            )}
          </Button>
        </td>
      ),
    },
    {
      label: 'Title',
      key: 'title',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: (_, rowIndex) => (
        <td>
          <Input
            className="input-sm"
            title=""
            name={`select.options.${rowIndex}.title`}
            isErrorMessageHidden
            registerOptions={getRequiredValidation()}
          />
        </td>
      ),
    },
    {
      label: 'Field value',
      key: 'value',
      headerCell: ({ value }) => <th className="w-[150px]">{value}</th>,
      columnCell: (_, rowIndex) => (
        <td>
          <Input
            className="input-sm"
            title=""
            name={`select.options.${rowIndex}.value`}
            isErrorMessageHidden
            registerOptions={getRequiredValidation()}
          />
        </td>
      ),
    },
    {
      label: 'Warning message',
      key: 'warning',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: (_, rowIndex) => (
        <td>
          <Input
            className="input-sm"
            title=""
            name={`select.options.${rowIndex}.warningMessage`}
          />
        </td>
      ),
    },
    {
      label: 'Yes / Ok',
      key: 'yesOk',
      headerCell: ({ value }) => <th className="text-center">{value}</th>,
      columnCell: (_, rowIndex) => (
        <td className="text-center">
          <SwitcherHookForm name={`select.options.${rowIndex}.yesOkButtons`} />
        </td>
      ),
    },
    {
      label: 'Delete',
      key: 'delete',
      headerCell: ({ value }) => <th className="text-center">{value}</th>,
      columnCell: (_, rowIndex) => (
        <td className="text-center">
          <Button
            className="w-10"
            size="small"
            variant="outline"
            type="button"
            onClick={() => onDeleteSelectOption(rowIndex)}
          >
            <MaterialIcon className="text-lg">delete</MaterialIcon>
          </Button>
        </td>
      ),
    },
  ];
}
