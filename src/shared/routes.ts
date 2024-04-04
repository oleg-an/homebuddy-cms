type PageRoutesType = {
  app: Record<string, string>;
};

export const pageRoutes = {
  app: {
    wizardList: '/wizards',
    wizard: '/wizards/:id',
    newWizard: '/wizards/new',
    auth: '/auth',
    recovery: '/recovery',
    newPassword: '/new-password',
    main: '/',
    notFound: '/404-not-found',
  },
} satisfies PageRoutesType;
