import { useLocation } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { useTitleStoreTitle } from 'shared/lib/store';
import { usePageTitle } from 'shared/lib/title';

const titles: Record<string, string> = {
  contractors: 'Contractors',
  campaigns: 'Campaigns',
  leads: 'Leads',
  appointments: 'Appointments',
  invoices: 'Invoices',
  billing: 'Billing',
  myAccount: 'My account',
  groups: 'Groups',
  overlapping: 'Overlapping',
  sales: 'Sales',
  faq: 'FAQs',
};

const getHeader = (pathname: string) => {
  const path = pathname;
  const appRoutesEntry = Object.entries(pageRoutes).map(([, routeEntry]) => routeEntry);
  const matchedRouteEntry =
    appRoutesEntry.find((routeEntry) => Object.values(routeEntry).find((routePath) => routePath === path)) || {};

  const routeNode = Object.entries(matchedRouteEntry).find(([, routePath]) => routePath === path) || [''];

  return titles[routeNode[0]];
};

export function LayoutHeader() {
  const location = useLocation();
  const title = useTitleStoreTitle();
  const page = title || getHeader(location.pathname);

  usePageTitle(getHeader(location.pathname));

  return (
    <div className="align-center flex h-16 items-center justify-between border-b border-slate-100 bg-white px-8">
      <div className="text-lg font-medium">{page}</div>
    </div>
  );
}
