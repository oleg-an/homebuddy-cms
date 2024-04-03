import type { Column } from 'shared/ui/Table';
import type { SelectOptionModel } from 'pages/Wizards/models';
import { Input } from 'shared/ui/Input';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Button } from 'shared/ui/Button';
import { noop } from 'shared/lib/functions';
import { Switcher } from 'shared/ui/Switcher';

export function getOptionsTableColumns(): Column<SelectOptionModel>[] {
  return [
    {
      label: 'Icon',
      key: 'icon',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: ({ row }) => (
        <td>
          {row.imageSrc ? (
            <img
              alt=""
              className="inline h-10 w-10 cursor-pointer"
              src="/assets/wizard/yes.svg"
              onClick={noop}
            />
          ) : (
            <>
              <Button
                variant="outline"
                size="medium"
                type="button"
                className="w-10"
              >
                <MaterialIcon className="text-lg">add_photo_alternate</MaterialIcon>
              </Button>
            </>
          )}
        </td>
      ),
    },
    {
      label: 'Title',
      key: 'title',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: () => (
        <td>
          <Input
            className="input-sm"
            title=""
            name="title"
            isErrorMessageHidden
          />
        </td>
      ),
    },
    {
      label: 'Field value',
      key: 'value',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: () => (
        <td>
          <Input
            className="input-sm"
            title=""
            name="value"
            isErrorMessageHidden
          />
        </td>
      ),
    },
    {
      label: 'Warning message',
      key: 'value',
      headerCell: ({ value }) => <th>{value}</th>,
      columnCell: () => (
        <td>
          <Input
            className="input-sm"
            title=""
            name="warningMessage"
          />
        </td>
      ),
    },
    {
      label: 'Yes / Ok',
      key: 'value',
      headerCell: ({ value }) => <th className="text-center">{value}</th>,
      columnCell: () => (
        <td className="text-center">
          <Switcher
            name="yesOkMessage"
            onChange={noop}
          />
        </td>
      ),
    },
    {
      label: 'Delete',
      key: 'value',
      headerCell: ({ value }) => <th className="text-center">{value}</th>,
      columnCell: () => (
        <td className="text-center">
          <Button
            className="w-10"
            size="small"
            variant="outline"
            type="button"
          >
            <MaterialIcon className="text-lg">delete</MaterialIcon>
          </Button>
        </td>
      ),
    },
  ];
}
