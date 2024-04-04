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
