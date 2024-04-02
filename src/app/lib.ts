import { pageRoutes } from 'shared/routes';
import { REDIRECT_URI } from 'entities/profile';

export const setRedirectUri = () => {
  const redirect = `${window.location.pathname}${window.location.search}`;
  const basePath = pageRoutes.app.auth;

  const param = redirect !== '/' ? `?${REDIRECT_URI}=${encodeURIComponent(redirect)}` : '';

  return `${basePath}${param}`;
};
