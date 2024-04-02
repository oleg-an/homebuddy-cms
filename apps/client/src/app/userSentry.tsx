import { useEffect } from 'react';

function sentryInit() {
  window.Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new window.Sentry.BrowserTracing()],
    tracesSampleRate: 0.2,
  });
}

export function useSentry() {
  useEffect(() => {
    if (window.isSentryLoaded) {
      sentryInit();
    } else {
      document.addEventListener('onSentryLoaded', sentryInit);
    }

    return () => {
      document.removeEventListener('onSentryLoaded', sentryInit);
    };
  }, []);
}
