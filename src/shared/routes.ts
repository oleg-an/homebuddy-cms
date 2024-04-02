type PageRoutesType = {
  app: Record<string, string>;
};

export const pageRoutes = {
  app: {
    wizard: '/wizard',
    auth: '/auth',
    recovery: '/recovery',
    newPassword: '/new-password',
    main: '/',
    notFound: '/404-not-found',
  },
} satisfies PageRoutesType;
