export const urlResolver = {
  hasParam: (name: string, value: string) => {
    const url = new URL(window.location.href);
    const paramValue = url.searchParams.get(name);

    return paramValue === value;
  },
  openNewTab: (name: string, value: string) => {
    const url = new URL(window.location.href);
    const hasParam = url.searchParams.get(name);

    if (hasParam) {
      url.searchParams.delete(name);
    }

    url.searchParams.append(name, value);

    window.open(url);
  },
  addParam: (name: string, value: string, onlyOne = true) => {
    const url = new URL(window.location.href);
    const hasParam = url.searchParams.get(name);

    if (hasParam && onlyOne) {
      url.searchParams.delete(name);
    }

    url.searchParams.append(name, value);

    window.history.replaceState({}, '', url);
  },
  removeParam: (name: string) => {
    const url = new URL(window.location.href);

    url.searchParams.delete(name);

    window.history.replaceState({}, '', url);
  },
};

export const isCorrectQueryParams = (
  url: string,
  { inQuery, outOfQuery }: { inQuery?: Record<string, string>; outOfQuery?: Record<string, string> }
) => {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);

  const queryParams = Object.fromEntries(params.entries());
  let isCorrectQuery = true;

  if (inQuery) {
    for (const [key, value] of Object.entries(inQuery)) {
      if (queryParams[key] !== value) {
        isCorrectQuery = false;
      }
    }
  }

  if (outOfQuery) {
    for (const [key, value] of Object.entries(outOfQuery)) {
      if (queryParams[key] === value) {
        isCorrectQuery = false;
      }
    }
  }

  return isCorrectQuery;
};
