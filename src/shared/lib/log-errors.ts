export interface LogErrorContext {
  contextKey: string;
  contextPayload: Record<string, string>;
}

export const logError = (err: unknown, context?: LogErrorContext) => {
  if (!process.env.REACT_APP_SENTRY_DSN) {
    // eslint-disable-next-line no-console
    console.error(err);

    return;
  }

  if (window.isSentryLoaded) {
    if (context) {
      window.Sentry.withScope((scope) => {
        scope.setContext(context.contextKey, context.contextPayload);
        window.Sentry.captureException(err);
      });
    } else {
      window.Sentry.captureException(err);
    }
  }
};
