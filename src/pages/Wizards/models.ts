export type StepType = 'singleSelect' | 'multiSelect';

export interface SelectOptionModel {
  index?: number; // only for form
  title: string;
  value: string;
  nextStepId?: number;
  warningMessage?: string;
  warningYesNoMessage?: string;
  imageSrc?: string;
}

export interface StepModel {
  id: number;
  title: string;
  name: string;
  isFirst?: boolean;
  select?: {
    type: StepType;
    options: SelectOptionModel[];
  };
  input?: {
    title: string;
    value: string;
  };
}

export interface WizardModel {
  id: number;
  steps: StepModel[];
}
