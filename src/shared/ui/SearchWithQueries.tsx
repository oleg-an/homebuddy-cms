import { SEARCH_PARAM_NAME } from 'shared/constants/filters';
import { useEffect } from 'react';
import type { UseFormReset } from 'react-hook-form';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import { useApiQueryActions, useApiQueryParamsSearch } from 'shared/lib/store';
import { urlResolver } from 'shared/lib/url';
import { Tooltip } from 'shared/ui/Tooltip';

import { Input } from './Input';

const searchKey = 'search';

export type FormValues = {
  [searchKey]: string;
};
interface SearchWithQueries {
  preventDefaultSearchSet?: boolean;
  rootClassName?: string;
  isDisabled?: boolean;
  title: string;
  attributes?: DataAttributes['attributes'];
  startFrom?: number;
  setReset?: (reset: UseFormReset<FormValues>) => void;
  isSyncedWithUrl?: boolean;
  initialSearch?: string;
}

export function SearchWithQueries({
  rootClassName,
  title,
  preventDefaultSearchSet,
  startFrom,
  setReset,
  attributes,
  isDisabled,
  isSyncedWithUrl,
  initialSearch,
}: SearchWithQueries) {
  const { setSearch } = useApiQueryActions();
  const searchParam = useApiQueryParamsSearch() || '';

  const methods = useForm<FormValues>({
    defaultValues: {
      [searchKey]: preventDefaultSearchSet ? '' : initialSearch,
    },
  });

  useEffect(() => {
    if (setReset) {
      setReset(methods.reset);
    }
  }, [setReset]);

  const search = useWatch({
    control: methods.control,
    name: searchKey,
  });

  useEffect(() => {
    if (searchParam !== search) {
      if (!startFrom || (startFrom && (search.length > startFrom || search.length === 0))) {
        setSearch(search);
        urlResolver.removeParam(SEARCH_PARAM_NAME);
        if (search && isSyncedWithUrl) {
          urlResolver.addParam(SEARCH_PARAM_NAME, search);
        }
      }
    }
  }, [search, startFrom]);

  return (
    <div className={rootClassName}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(() => {
            if (!startFrom || (startFrom && search.length > startFrom)) {
              setSearch(search);
            }
          })}
        >
          <Input
            title={title}
            name="search"
            isDisabled={isDisabled}
            isSmall
            debounceTime={600}
            className="w-full"
            iconName="search"
            attributes={attributes}
          />
        </form>
      </FormProvider>
    </div>
  );
}

type SearchTooltipProps = SearchWithQueries & {
  className?: string;
  content: JSX.Element | string | React.ReactNode;
};

function SearchTooltip(props: SearchTooltipProps) {
  const { className, content } = props;

  return (
    <Tooltip
      className={className}
      content={content}
      placement="bottom-start"
      contentClass="!text-left"
    >
      <SearchWithQueries {...props} />
    </Tooltip>
  );
}

SearchWithQueries.Tooltip = SearchTooltip;
