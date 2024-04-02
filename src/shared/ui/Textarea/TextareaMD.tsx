import MDEditor, { commands } from '@uiw/react-md-editor';
import classNames from 'classnames';
import { useFormContext, Controller } from 'react-hook-form';
import { getInputError } from 'shared/lib/form';

import style from './TextareaMD.module.scss';
import { TextareaPlaceholder } from './TextareaPlaceholder';

interface TextareaMDProps {
  className?: string;
  placeholder?: string;
  name: string;
  isDisabled?: boolean;
  isOptional?: boolean;
}
/**
 *
 * @attention MDEditor uses esm modules, so it requires jest config to be changed
 * for now, import it like this: components/common/controls/textarea/TextareaMD;
 */
export function TextareaMD({ className, placeholder, name, isDisabled, isOptional }: TextareaMDProps) {
  const methods = useFormContext();
  const errors = methods.formState.errors;
  const error = getInputError(errors, name);

  return (
    <span
      data-color-mode="light"
      className={classNames(style.wrapper, className)}
    >
      <Controller
        control={methods.control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <div className="relative">
            {!value && (
              <TextareaPlaceholder
                placeholder={placeholder}
                isOptional={isOptional}
                className="left-[16px] top-[31px]"
              />
            )}
            <MDEditor
              preview="edit"
              value={value}
              prefixCls="w-md-editor-custom"
              className="w-md-editor-class"
              onChange={onChange}
              aria-disabled={isDisabled}
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.link,
                commands.unorderedListCommand,
                commands.orderedListCommand,
              ]}
              extraCommands={[]}
              textareaProps={{}}
              visibleDragbar={false}
            />
          </div>
        )}
      />

      {!!error && <p className="ml-4 mt-1 text-xs font-medium text-red-500">{error}</p>}
    </span>
  );
}
