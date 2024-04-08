import { uuidv4 } from 'shared/lib/uuidv4';

export function getRequiredValidation() {
  return {
    validate: (key: string) => {
      if (!key.trim()) {
        return 'This field is required';
      }

      return undefined;
    },
  };
}

export function getIconUrl(iconName: string) {
  return `${iconName}`;
}

export function getNewStep() {
  return {
    title: '',
    id: uuidv4(),
  };
}
