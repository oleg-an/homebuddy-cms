const ERROR_MSG = "Material Icons aren't loaded!";

interface ControlledPromiseResult<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: () => void;
}

function makeOutControlledPromise<T>(): ControlledPromiseResult<T> {
  const result = {
    promise: Promise.resolve() as Promise<T>,
    resolve: () => {},
    reject: () => {},
  } as ControlledPromiseResult<T>;

  result.promise = new Promise<T>((innerResolve, innerReject) => {
    result.resolve = innerResolve;
    result.reject = innerReject;
  });

  return result;
}

async function setupMocks(fonts: FontFace[]) {
  const { promise, resolve, reject } = makeOutControlledPromise<FontFaceSet>();
  const loadMockFn = jest.fn();
  const errorMockFn = jest.fn();
  const logErrorMockFn = jest.fn();
  const fontFaceSet = new Set<FontFace>(fonts) as FontFaceSet;

  Object.defineProperty(document, 'fonts', {
    value: { ready: promise } as FontFaceSet,
  });

  const { WHEN_ICONS_ARE_LOADED, areIconsLoaded } = await import('shared/lib/fonts/fonts');

  WHEN_ICONS_ARE_LOADED.then(loadMockFn, errorMockFn);
  const errorUtils = await import('shared/lib/log-errors');

  jest.spyOn(errorUtils, 'logError').mockImplementation(logErrorMockFn);

  // Expect initials are correct
  expect(areIconsLoaded()).toBe(false);
  expect(loadMockFn).not.toBeCalled();
  expect(errorMockFn).not.toBeCalled();
  expect(logErrorMockFn).not.toBeCalled();

  return {
    resolve,
    reject,
    loadMockFn,
    errorMockFn,
    logErrorMockFn,
    WHEN_ICONS_ARE_LOADED,
    areIconsLoaded,
    fontFaceSet,
  };
}

describe('WHEN_ICONS_ARE_LOADED', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should resolve when document.fonts are ready', async () => {
    const fonts = [
      {
        family: 'Open Sans',
        status: 'unloaded',
      },
      {
        family: 'Material Icons Outlined',
        status: 'loaded',
      },
    ] as FontFace[];

    const $ = await setupMocks(fonts);

    $.resolve($.fontFaceSet);

    await expect($.WHEN_ICONS_ARE_LOADED).resolves.toBe(undefined);
    expect($.areIconsLoaded()).toBe(true);
    expect($.loadMockFn).toBeCalled();
    expect($.errorMockFn).not.toBeCalled();
    expect($.logErrorMockFn).not.toBeCalled();
  });

  test('should log error when no Material Icons fonts are loaded', async () => {
    const fonts = [
      {
        family: 'Open Sans',
        status: 'unloaded',
      },
    ] as FontFace[];

    const $ = await setupMocks(fonts);

    $.resolve($.fontFaceSet);

    await expect(document.fonts.ready).resolves.toBe($.fontFaceSet);
    expect($.areIconsLoaded()).toBe(false);
    expect($.loadMockFn).toBeCalled();
    expect($.errorMockFn).not.toBeCalled();
    expect($.logErrorMockFn).toBeCalledWith(ERROR_MSG);
  });

  test('should log error when documents.ready fails with error', async () => {
    const $ = await setupMocks([]);

    $.reject();

    await expect(document.fonts.ready).rejects.toBe(undefined);
    expect($.areIconsLoaded()).toBe(false);
    expect($.loadMockFn).not.toBeCalled();
    expect($.errorMockFn).not.toBeCalled();
    expect($.logErrorMockFn).toBeCalledWith(ERROR_MSG);
  });
});
