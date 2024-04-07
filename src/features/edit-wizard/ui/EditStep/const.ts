import type { StepSelectModel, StepSelectOptionModel } from 'entities/wizard';

export const yesNoSelect: StepSelectModel = {
  fieldName: '',
  isMultiselect: false,
  options: [
    {
      title: 'Yes',
      value: 'yes',
      yesOkButtons: false,
      imageName: 'yes.svg',
    },
    {
      title: 'No',
      value: 'no',
      yesOkButtons: false,
      imageName: 'no.svg',
    },
  ],
};

export const yesNoNotSureSelect: StepSelectModel = {
  fieldName: '',
  isMultiselect: false,
  options: [
    {
      title: 'Yes',
      value: 'yes',
      yesOkButtons: false,
      imageName: 'yes.svg',
    },
    {
      title: 'No',
      value: 'no',
      yesOkButtons: false,
      imageName: 'no.svg',
    },
    {
      title: 'Not sure',
      value: 'notSure',
      yesOkButtons: false,
      imageName: 'not-sure.svg',
    },
  ],
};

export const newSelect: StepSelectModel = {
  fieldName: '',
  isMultiselect: false,
  options: [
    {
      title: '',
      value: '',
      yesOkButtons: false,
    },
  ],
};

export const newSelectOption: StepSelectOptionModel = {
  title: '',
  value: '',
  yesOkButtons: false,
};
