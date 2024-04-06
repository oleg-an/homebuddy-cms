export interface StepSelectOptionModel {
  title: string;
  value: string;
  redirectStepId?: string;
  warningMessage?: string;
  yesOkButtons?: boolean;
  imageSrc?: string;
}

export interface StepModel {
  id: string;
  title: string;
  isFirst?: boolean;
  select?: {
    fieldName: string;
    isMultiselect: boolean;
    options: StepSelectOptionModel[];
  };
  input?: {
    title: string;
    value: string;
  };
}

export interface WizardModel {
  _id: string;
  steps: StepModel[];
}
