export interface SelectOptionModel {
  index?: number; // only for form
  title: string;
  value: string;
  nextStepId?: string;
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
    isMultiselect?: boolean;
    options: SelectOptionModel[];
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
