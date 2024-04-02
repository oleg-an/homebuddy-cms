import { pageRoutes } from 'shared/routes';
import { REDIRECT_URI } from 'entities/profile';

export const setRedirectUri = () => {
  const redirect = `${window.location.pathname}${window.location.search}`;
  const basePath = redirect.startsWith(pageRoutes.internal.auth) ? pageRoutes.internal.auth : pageRoutes.app.auth;

  const param = redirect !== '/' ? `?${REDIRECT_URI}=${encodeURIComponent(redirect)}` : '';

  return `${basePath}${param}`;
};
