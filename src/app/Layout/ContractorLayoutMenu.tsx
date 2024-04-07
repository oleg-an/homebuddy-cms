import { useState } from 'react';
import { pageRoutes } from 'shared/routes';

import { ContractorMenuLink } from './ContractorMenuLink';
import { LayoutMenu } from './LayoutMenu';

export function ContractorLayoutMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <LayoutMenu
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      logoClassName="bg-[url('/assets/menu/contractor/logo.svg')]"
      smallLogoClassName="bg-[url('/assets/menu/contractor/logo-small.svg')]"
      className="border-r border-slate-100 bg-white"
    >
      <div className="flex grow flex-col justify-between">
        <div className="mt-29">
          <ContractorMenuLink
            iconName="quiz"
            title="Wizards"
            href={pageRoutes.app.wizardList}
            isSmallSize={!isMenuOpen}
          />
          <ContractorMenuLink
            iconName="perm_media"
            title="Media Library"
            href={pageRoutes.app.mediaLibrary}
            isSmallSize={!isMenuOpen}
          />
        </div>
      </div>
    </LayoutMenu>
  );
}
