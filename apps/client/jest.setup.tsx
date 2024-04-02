import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import 'jest-expect-message';

jest.mock('axios');

jest.mock('zustand');

jest.useFakeTimers();

jest.setTimeout(30000);

global.ResizeObserver = require('resize-observer-polyfill');

// fonts
const fontsSet = new Set<FontFace>([
  {
    family: 'Open Sans Bold',
    status: 'unloaded',
  },
  {
    family: 'Open Sans',
    status: 'loaded',
  },
  {
    family: 'Material Icons Outlined',
    status: 'loaded',
  },
] as FontFace[]) as FontFaceSet;

Object.defineProperty(document, 'fonts', {
  value: { ready: Promise.resolve(fontsSet) },
  configurable: true,
});

configure({ defaultHidden: true });
