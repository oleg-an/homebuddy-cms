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
  return `https://wizard-bf8f.restdb.io/media/${iconName}`;
}
