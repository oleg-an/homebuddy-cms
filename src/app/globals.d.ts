declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CI: string | undefined;
      BUILD_PATH: string | undefined;
      REACT_APP_SENTRY_DSN: string | undefined;
      REACT_APP_STRIPE_PUB_KEY: string;
      REACT_APP_API_BASE_URL: string | undefined;
    }
  }

  interface Window {
    Sentry: {
      init(options: BrowserOptions): void;
      BrowserTracing: typeof BrowserTracing;
      captureException: (err: unknown) => void;
      withScope: (
        param: (scope: { setContext: (key: string, payload: Record<string, string>) => void }) => void
      ) => void;
    };
    isSentryLoaded: boolean;
  }
}

export {};
