import { useLocation } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { useTitleStoreTitle } from 'shared/lib/store';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import { usePageTitle } from 'shared/lib/title';
import {
  useLogout,
  useGetUser,
  type AuthenticatedContractorModel,
  type AuthenticatedManagerModel,
} from 'entities/profile';

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
  const person = useGetUser<AuthenticatedManagerModel | AuthenticatedContractorModel>().data?.data;
  const location = useLocation();
  const title = useTitleStoreTitle();
  const page = title || getHeader(location.pathname);
  const logout = useLogout();

  usePageTitle(getHeader(location.pathname));

  return (
    <div className="align-center flex h-16 items-center justify-between border-b border-slate-100 bg-white px-8">
      <div className="text-lg font-medium">{page}</div>
      {person && (
        <div className="flex flex-col font-medium">
          <div className="text-xs">{'companyName' in person ? person.companyName : person.fullName}</div>
          <div
            className="cursor-pointer select-none text-right text-xs text-deep-blue-500"
            onClick={logout}
            {...getDataAutoTestAttributes(['button-logout']).attributes}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
