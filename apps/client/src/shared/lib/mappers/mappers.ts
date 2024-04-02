import type { Option } from 'shared/ui/Select';

export type MappableListItem = { id: string | number };

interface MapToOptionsParams<T extends MappableListItem> {
  textField: (item: T) => string;
  items?: T[];
  optionsToAdd?: Option[];
  position?: 'push' | 'unshift';
}

export function mapToOptions<T extends MappableListItem>({
  textField,
  items = [],
  position = 'unshift',
  optionsToAdd,
}: MapToOptionsParams<T>): Option[] {
  const mappedItems = items.map((item) => ({
    text: textField(item),
    id: item.id.toString(),
  }));

  if (optionsToAdd) {
    mappedItems[position](...optionsToAdd);
  }

  return mappedItems;
}
