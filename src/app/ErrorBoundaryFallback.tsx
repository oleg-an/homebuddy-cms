import { Button } from 'shared/ui/Button';

export function ErrorBoundaryFallback() {
  return (
    <div className="rounded-md px-6 py-12 text-center font-medium">
      <div className="mb-2 text-xl">🤔 Something went wrong</div>
      <div className="mb-6 text-sm">Please reload the page or try again later.</div>
      <Button
        className="w-[195px]"
        onClick={() => {
          window.location.href = '/';
        }}
        iconLeftName="home"
      >
        Return home
      </Button>
    </div>
  );
}
