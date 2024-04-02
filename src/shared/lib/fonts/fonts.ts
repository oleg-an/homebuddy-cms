import { logError } from 'shared/lib/log-errors';

const isIconFont = (font: FontFace) => font.family.startsWith('Material Icons');
const isFontLoaded = (font: FontFace) => font.status === 'loaded';

let areIconsResolved = false;

function resolveWhenIconsLoaded(resolve: () => void) {
  const logLoadingError = () => logError("Material Icons aren't loaded!");

  const onLoad = (fonts: FontFaceSet) => {
    const iconsFonts = [...fonts].filter((f) => isIconFont(f) && isFontLoaded(f));

    if (iconsFonts.length) {
      areIconsResolved = true;
    } else {
      logLoadingError();
    }

    resolve();
  };

  document.fonts.ready.then(onLoad, logLoadingError);
}

export const areIconsLoaded = () => areIconsResolved;
export const WHEN_ICONS_ARE_LOADED = new Promise<void>(resolveWhenIconsLoaded);
