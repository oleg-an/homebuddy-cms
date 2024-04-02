type PageRoutesType = {
  app: Record<string, string>;
};

export const pageRoutes = {
  app: {
    wizard: '/wizards',
    auth: '/auth',
    notFound: '/404-not-found',
    main: '/',
    recovery: '/recovery',
    newPassword: '/new-password'
  },
} satisfies PageRoutesType;
