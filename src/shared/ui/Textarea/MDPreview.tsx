import MDEditor from '@uiw/react-md-editor';
import classNames from 'classnames';
import type { Placement } from 'shared/ui/Tooltip';
import { Tooltip } from 'shared/ui/Tooltip';
import { useTruncate } from 'shared/lib/useTruncate';

import style from './MDPreview.module.scss';

interface MDPreview {
  value: string;
  className?: string;
  inlineStyle?: React.CSSProperties;
  tooltip?: {
    placement: Placement;
    content: JSX.Element | string;
    className?: string;
    contentClassName?: string;
    widthClassName?: string;
  };
}

const rootSelector = (rootRef: React.MutableRefObject<HTMLDivElement | undefined>) =>
  rootRef.current && (rootRef.current.getElementsByClassName('wmde-markdown')[0] as HTMLSpanElement);

/**
 *
 * @attention MDEditor uses esm modules, so it requires jest config to be changed
 * for now, import it like this: components/common/controls/textarea/MDPreview;
 */
export function MDPreview({ value, className, tooltip, inlineStyle }: MDPreview) {
  const { ref, isTruncated } = useTruncate(rootSelector);

  return (
    <span
      ref={ref}
      data-color-mode="light"
      className="w-full"
    >
      {tooltip && isTruncated ? (
        <Tooltip
          placement={tooltip.placement}
          content={tooltip.content}
          className={tooltip.className}
          contentClass={(tooltip.contentClassName, 'block')}
          widthClass={tooltip.widthClassName}
        >
          <MDEditor.Markdown
            source={value}
            className={classNames(className, style.mdPreview)}
            linkTarget="_blank"
            style={inlineStyle}
          />
        </Tooltip>
      ) : (
        <MDEditor.Markdown
          source={value}
          className={classNames(className, style.mdPreview)}
          linkTarget="_blank"
          style={inlineStyle}
        />
      )}
    </span>
  );
}
