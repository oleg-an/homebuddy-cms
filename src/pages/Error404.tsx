import { useHistory } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { Button } from 'shared/ui/Button';
import { usePageTitle } from 'shared/lib/title';

export function Error404() {
  usePageTitle('Page Not Found');

  const history = useHistory();

  return (
    <div className="mx-auto mt-19 max-w-[1128px] rounded-md border border-slate-100 px-6 py-12 text-center font-medium">
      <div className="mb-2 text-xl">🤔 Something went wrong</div>
      <div className="mb-6 text-sm">The page you are looking for does not exist.</div>
      <Button
        className="w-[195px]"
        onClick={() => history.push(pageRoutes.app.main)}
        iconLeftName="home"
      >
        Return home
      </Button>
    </div>
  );
}
