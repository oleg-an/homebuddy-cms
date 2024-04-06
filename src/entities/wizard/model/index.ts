export interface StepSelectOptionModel {
  title: string;
  value: string;
  redirectStepId?: string;
  warningMessage?: string;
  yesOkButtons: boolean;
  imageName?: string;
}

export interface StepSelectModel {
  fieldName: string;
  isMultiselect: boolean;
  options: StepSelectOptionModel[];
}

export interface StepModel {
  id: string;
  title: string;
  isFirst?: boolean;
  select?: StepSelectModel;
  input?: {
    title: string;
    value: string;
  };
}

export interface WizardModel {
  _id: string;
  steps: StepModel[];
}
