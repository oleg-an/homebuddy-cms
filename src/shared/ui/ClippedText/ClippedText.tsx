import classNames from 'classnames';
import type { Placement } from 'shared/ui/Tooltip';
import { Tooltip } from 'shared/ui/Tooltip';
import { useTruncate } from 'shared/lib/useTruncate';

interface ClippedTextProps {
  className?: string;
  as?: React.ElementType;
  clamp?: 1 | 2 | 3 | 4 | 5 | 6 | 'none';
  text: string | null;
  tooltip?: {
    placement?: Placement;
    content: JSX.Element | string;
    className?: string;
    contentClass?: string;
    widthClass?: string;
  };
}

const lineClamps = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
  none: 'line-clamp-none',
}; // because of https://github.com/tailwindlabs/tailwindcss/discussions/7273

export function ClippedText(props: ClippedTextProps) {
  const { className, as: Component = 'div', text, tooltip, clamp = 2 } = props;
  const clampClass = lineClamps[clamp];

  const { ref, isTruncated } = useTruncate();

  if (!text) {
    return null;
  }

  if (tooltip) {
    tooltip.widthClass = tooltip.widthClass || 'max-w-[440px]';
    tooltip.placement = tooltip.placement || 'bottom-start';
  }

  return (
    <Component
      className={classNames(className, 'overflow-hidden')}
      ref={ref}
    >
      {tooltip && isTruncated ? (
        <Tooltip
          placement={tooltip.placement as Placement}
          content={tooltip.content}
          className={classNames(clampClass, tooltip.className, 'cursor-pointer')}
          contentClass={classNames(tooltip.contentClass, 'block')}
          widthClass={tooltip.widthClass}
        >
          {text}
        </Tooltip>
      ) : (
        <span className={clampClass}>{text}</span>
      )}
    </Component>
  );
}
