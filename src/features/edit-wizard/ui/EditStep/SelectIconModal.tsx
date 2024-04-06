import { SideModal, SideModalBody } from 'shared/ui/SideModal';

import { getIconUrl } from '../utils';

export function SelectIconModal() {
  const icons = Array.from(Array(400).keys()).map(() => ({
    imageName: getIconUrl('yes.svg'),
  }));

  return (
    <SideModal isLarge>
      <SideModalBody title="Select icon">
        <div className="grid grid-cols-5 gap-4">
          {icons.map((icon, index) => {
            return (
              <div
                className="flex items-center justify-center rounded-md border border-slate-100 p-2"
                key={index}
              >
                <img
                  alt=""
                  className="h-10 w-10"
                  src={icon.imageName}
                />
              </div>
            );
          })}
        </div>
      </SideModalBody>
    </SideModal>
  );
}
