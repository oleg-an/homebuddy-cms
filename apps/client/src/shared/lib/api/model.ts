export type UrlParams = Record<string, string | number> | URLSearchParams | string[][];

// TODO:
// update all collection responses according to this types
// and add errors to response type
// all details here:
// https://sirenltd.stoplight.io/docs/homebuddy/03jn4ex1irkxg-common-rest-api-conventions

export interface CollectionSuccessApiResponse<T = Object> {
  data: T[];
  meta: MetaModel;
}

export interface ResourceSuccessApiResponse<T> {
  data: T;
}

export type AllCampaignsSelectedState = 'all' | 'partial' | 'none';

export interface MetaModel<TSearch = never, TFilters = never> {
  page: number;
  limit: number;
  total: number;
  total_without_filters: number;
  search: TSearch;
  filters: TFilters;
  selected?: number;
  selectAllState?: AllCampaignsSelectedState;
}

// https://sirenltd.stoplight.io/docs/homebuddy/03jn4ex1irkxg-common-rest-api-conventions#response-body
export interface ValidationErrorsItemModel {
  code: string;
  message: string;
}
export interface ValidationErrorsModel {
  errors: Record<string, ValidationErrorsItemModel[] | undefined>;
}
export interface NonValidationErrorModel {
  error: string;
}

export type ErrorsModel = ValidationErrorsModel | NonValidationErrorModel;

export interface AxiosResponseErrorModel {
  response: {
    data: ErrorsModel;
    status: number;
  };
}
