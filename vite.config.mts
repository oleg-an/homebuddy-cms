import path from 'path';

import istanbul from 'vite-plugin-istanbul';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.REACT_APP_SENTRY_DSN': JSON.stringify(env.REACT_APP_SENTRY_DSN),
      'process.env.REACT_APP_STRIPE_PUB_KEY': JSON.stringify(env.REACT_APP_STRIPE_PUB_KEY),
      'process.env.REACT_APP_API_BASE_URL': JSON.stringify(env.REACT_APP_API_BASE_URL),
      'process.env.REACT_APP_GROWTHBOOK_CLIENT_KEY': JSON.stringify(env.REACT_APP_GROWTHBOOK_CLIENT_KEY),
      'process.env.REACT_APP_PLAYWRIGHT_RUNNING': JSON.stringify(env.REACT_APP_PLAYWRIGHT_RUNNING),
    },
    build: {
      chunkSizeWarningLimit: 700,
      outDir: process.env.BUILD_PATH ?? 'build',
      sourcemap: !!process.env.ENABLE_SOURCE_MAP,
    },
    resolve: {
      alias: {
        app: path.resolve(__dirname, 'src/app'),
        entities: path.resolve(__dirname, 'src/entities'),
        features: path.resolve(__dirname, 'src/features'),
        pages: path.resolve(__dirname, 'src/pages'),
        shared: path.resolve(__dirname, 'src/shared'),
        stories: path.resolve(__dirname, 'src/stories'),
        widgets: path.resolve(__dirname, 'src/widgets'),
      },
    },
    plugins: [
      react(),
      checker({
        overlay: { initialIsOpen: false },
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      istanbul({
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['node_modules', '**/*.spec.ts', '**/*.test.(ts|tsx)'],
        extension: ['.ts', '.tsx'],
        requireEnv: false,
        forceBuildInstrument: !!process.env.ENABLE_INSTRUMENTATION,
      }),
      viteTsconfigPaths(),
      svgrPlugin(),
    ],
    server: {
      port: 3000,
    },
  };
});
