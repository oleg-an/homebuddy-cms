import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { usePromise } from 'react-use';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import { areIconsLoaded, WHEN_ICONS_ARE_LOADED } from 'shared/lib/fonts';
import { noop } from 'shared/lib/functions';

interface MaterialIconProps extends DataAttributes {
  className?: string;
  children: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  type?: 'outlined' | 'filled';
  testId?: string;
}

export function MaterialIcon({
  className,
  children,
  onClick,
  style = {},
  type = 'outlined',
  testId,
  attributes,
}: MaterialIconProps) {
  const onlyWhileMounted = usePromise();
  const [isLoaded, setIsLoaded] = useState(areIconsLoaded());

  useEffect(() => {
    onlyWhileMounted(WHEN_ICONS_ARE_LOADED).then(() => setIsLoaded(true), noop);
  }, []);

  return (
    <span
      className={classNames(
        className,
        type === 'outlined' ? 'material-icons-outlined' : 'material-icons',
        isLoaded ? 'opacity-100' : 'opacity-0 w-[1em]'
      )}
      onClick={onClick}
      style={style}
      data-testid={testId}
      {...attributes}
    >
      {children}
    </span>
  );
}
