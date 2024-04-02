import { mapToOptions } from './mappers';

const optionsList = [{ id: '1', text: 'name' }];

describe('mapToOptions', () => {
  test('mapToOptions', () => {
    expect(mapToOptions({ items: [{ id: 1, name: 'name' }], textField: ({ name }) => name })).toEqual(optionsList);
    expect(mapToOptions({ items: [{ id: 1, name: 'name' }], textField: ({ name }) => name })).toEqual(optionsList);
    expect(mapToOptions({ items: [{ id: 1, fullName: 'name' }], textField: ({ fullName }) => fullName })).toEqual(
      optionsList
    );
    expect(
      mapToOptions({ items: [{ id: 1, companyName: 'name' }], textField: ({ companyName }) => companyName })
    ).toEqual(optionsList);
    expect(
      mapToOptions({
        items: [{ id: 1, companyName: 'name' }],
        textField: ({ companyName }) => companyName,
        optionsToAdd: [],
      })
    ).toEqual(optionsList);

    expect(mapToOptions({ items: [], textField: ({ name }) => name })).toEqual([]);
    expect(mapToOptions({ items: [], textField: ({ name }) => name })).toEqual([]);
    expect(mapToOptions({ items: [], textField: ({ companyName }) => companyName })).toEqual([]);
    expect(mapToOptions({ items: [], textField: ({ fullName }) => fullName })).toEqual([]);
  });
});
