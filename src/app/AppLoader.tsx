import { Loader } from 'shared/ui/Loader';

export function AppLoader() {
  return (
    <Loader
      className="mt-10 flex w-full justify-center"
      svgClasses="h-[52px] w-[52px] fill-slate-600 ml-[10px]"
    />
  );
}
