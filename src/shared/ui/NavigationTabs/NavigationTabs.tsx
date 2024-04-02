import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Tooltip } from 'shared/ui/Tooltip';
import type { DataAttributes } from 'shared/lib/data-auto-test';

export interface Tab extends DataAttributes {
  id: number;
  text: string;
  onClick: () => void;
  icon?: {
    iconName: string;
    tooltipText?: string;
    tooltipWidthClass: string;
  };
}

interface NavigationTabsModel {
  tabs: Tab[];
  selectedId: number;
  itemWidth: number;
}

export function NavigationTabs({ tabs, selectedId, itemWidth }: NavigationTabsModel) {
  const onClickHandler = (cb: Tab['onClick']) => {
    cb();
  };

  return (
    <div className="flex-start flex text-sm font-normal">
      {tabs.map(({ text, id, onClick, icon, attributes }) => {
        return (
          <div
            {...attributes}
            key={id}
            onClick={() => onClickHandler(onClick)}
            className={classNames(
              'select-none pt-4 flex justify-center h-[52px] text-deep-blue-500 cursor-pointer border-b border-slate-400 hover:border-b-2 hover:!border-deep-blue-500 group relative',
              {
                'border-b-2 bg-deep-blue-25 rounded-t-sm !border-deep-blue-500': selectedId === id,
              }
            )}
            style={{ width: itemWidth }}
            {...attributes}
          >
            <div className="text-deep-blue-500">{text}</div>
            {icon && (
              <TabIcon
                iconName={icon.iconName}
                tooltipText={icon.tooltipText}
                tooltipWidthClass={icon.tooltipWidthClass}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface TabIconProps {
  iconName: string;
  tooltipText?: string;
  tooltipWidthClass: string;
}
function TabIcon({ iconName, tooltipText, tooltipWidthClass }: TabIconProps) {
  const icon = (
    <MaterialIcon className="slate absolute right-4 cursor-pointer text-base leading-[20px] text-slate-300 hover:text-deep-blue-500">
      {iconName}
    </MaterialIcon>
  );

  return tooltipText ? (
    <Tooltip
      placement="top-start"
      content={tooltipText}
      className="cursor-pointer"
      widthClass={tooltipWidthClass}
      contentClass="!text-left !p-[11px]"
    >
      {icon}
    </Tooltip>
  ) : (
    icon
  );
}
