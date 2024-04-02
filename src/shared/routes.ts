type PageRoutesType = {
  app: Record<string, string>;
};

export const pageRoutes = {
  app: {
    wizard: '/wizards',
    auth: '/auth',
    recovery: '/recovery',
    newPassword: '/new-password',
    main: '/',
    notFound: '/404-not-found',
  },
} satisfies PageRoutesType;
