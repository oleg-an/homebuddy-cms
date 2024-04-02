type AttributeNames = Array<[name: string, value?: string] | string>;

export type StartWith<S extends string> = `${S}${string}`;

export type DataAutotest = StartWith<'data-autotest'>;

export type DataAttributes = {
  attributes?: Record<DataAutotest, string>;
};

export const getDataAutoTestAttributes = (names: AttributeNames): DataAttributes => {
  return names.reduce(
    (acc, attribute) => {
      const isArray = Array.isArray(attribute);
      const name = isArray ? attribute[0] : attribute;
      const value = isArray ? attribute[1] || '' : '';

      return {
        ...acc,
        attributes: {
          ...acc.attributes,
          [`data-autotest-${name}`]: value,
        },
      };
    },
    { attributes: {} } as DataAttributes
  );
};
