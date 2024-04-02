export const noop = () => {};

export const buildArrayQueryString = (key: string, params: string[]): string => {
  // it will build array query params string like this "cars[]=Saab&cars[]=Audi" need for PHP parse
  // because we can not use this variant  "?cars=Saab,Audi" (Haven’t tried this for PHP)
  return params
    .reduce((acc, param) => {
      return `${acc}${key}=${param}&`;
    }, '')
    .slice(0, -1);
};
