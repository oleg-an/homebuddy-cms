import { useFormContext } from 'react-hook-form';
import { getInputError } from 'shared/lib/form';

export function InputError({ name }: { name: string }) {
  const methods = useFormContext();

  const error = getInputError(methods.formState.errors, name).replace(/\n/g, '<br />');

  if (error) {
    return (
      <div className="pl-4 pt-1 text-xs font-medium text-red-500">
        <span dangerouslySetInnerHTML={{ __html: error }} />
      </div>
    );
  }

  return null;
}
