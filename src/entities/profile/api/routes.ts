export const profileRoutes = {
  app: {
    deleteToken: '/app/tokens',
    getToken: '/app/tokens',
    getUser: '/app/contractors/me',
    getNotifications: '/app/contractors/me/notifications',
    updateNotifications: '/app/contractors/me/notifications',
    updateUser: `/app/contractors/me`,
  },
  internal: {
    getUser: '/internal/managers/me',
    deleteToken: '/internal/tokens',
    getToken: '/internal/tokens',
  },
};
