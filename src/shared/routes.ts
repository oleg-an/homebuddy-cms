type PageRoutesType = {
  app: Record<string, string>;
  internal: Record<string, `/admin/${string}` | `/internal/${string}` | '/admin'>;
};

export const pageRoutes = {
  app: {
    wizard: '/wizard',
    auth: '/auth',
    recovery: '/recovery',
    newPassword: '/new-password',
    contractors: '/contractors',
    campaigns: '/campaigns',
    leads: '/leads',
    appointments: '/appointments',
    invoices: '/invoices',
    sales: '/sales',
    billing: '/billing',
    myAccount: '/my-account',
    main: '/',
    notFound: '/404-not-found',
    impersonateError: '/impersonate-error',
    faq: '/faq',
  },
  internal: {
    auth: '/admin',
    recovery: '/internal/recovery',
    newPassword: '/internal/new-password',
    contractors: '/admin/contractors',
    campaigns: '/admin/campaigns',
    leads: '/admin/leads',
    groups: '/admin/groups',
    overlapping: '/admin/overlapping',
    appointments: '/admin/appointments',
    invoices: '/admin/invoices',
    sales: '/admin/sales',
    billing: '/admin/billing',
    addNewCampaign: '/admin/groups/add-campaigns-to-the-group/:groupId',
    createNewGroup: '/admin/groups/create-new-group/:groupId',
    singleView: '/admin/groups/:id',
  },
} satisfies PageRoutesType;
