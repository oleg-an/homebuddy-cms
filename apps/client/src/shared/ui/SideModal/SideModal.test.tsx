import { act, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { SideModal } from './SideModal';
import { SideModalBody } from './SideModalBody';
import { SideModalContainer } from './SideModalContainer';
import { useModalsActions } from './UseSideModalStore';

describe('SideModal', () => {
  test('Open modal, check the title and body', async () => {
    render(<SideModalContainer />);
    const { result } = renderHook(useModalsActions);

    act(() => {
      result.current.open(
        <SideModal>
          <SideModalBody title="title1">body1</SideModalBody>
        </SideModal>
      );
    });

    expect(screen.getByText('title1')).toBeVisible();
    expect(screen.getByText('body1')).toBeVisible();
  });
  test('Open large modal, check the title, body and size', async () => {
    render(<SideModalContainer />);
    const { result } = renderHook(useModalsActions);

    act(() => {
      result.current.open(
        <SideModal isLarge>
          <SideModalBody
            title="LargeTitle"
            isLarge
          >
            LargeBody
          </SideModalBody>
        </SideModal>
      );
    });

    // Check width of modal
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByTestId('modal1').firstChild).toHaveClass('w-224');
    expect(screen.getByText('LargeTitle')).toBeVisible();
    expect(screen.getByText('LargeBody')).toBeVisible();
  });
});
