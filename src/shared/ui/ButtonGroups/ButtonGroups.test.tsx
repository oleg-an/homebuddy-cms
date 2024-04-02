import { screen } from '@testing-library/react';
import { setup } from 'shared/lib/testing';

import { ButtonGroups } from './ButtonGroups';

const items = [
  {
    id: 1,
    label: 'Button 1',
    onClick: jest.fn(),
    isSelected: true,
  },
  {
    id: 2,
    label: 'Button 2',
    onClick: jest.fn(),
  },
  {
    id: 3,
    label: 'Button 3',
    onClick: jest.fn(),
  },
];

describe('ButtonGroups', () => {
  it('renders the correct label for each button', () => {
    const { getAllByText } = setup(
      <ButtonGroups
        items={items}
        selectedId={1}
      />
    );

    expect(getAllByText('Button 1')[0]).toBeInTheDocument();
    expect(getAllByText('Button 2')[0]).toBeInTheDocument();
    expect(getAllByText('Button 3')[0]).toBeInTheDocument();
  });

  it('calls the onClick function when a button is clicked', async () => {
    const { getAllByText, user } = setup(
      <ButtonGroups
        items={items}
        selectedId={1}
      />
    );

    await user.click(getAllByText('Button 1')[0]);
    expect(items[0].onClick).toHaveBeenCalledTimes(1);
  });

  it('adds the isSelected class to the selected button', () => {
    const { getAllByText } = setup(
      <ButtonGroups
        items={items}
        selectedId={1}
      />
    );

    expect(getAllByText('Button 1')[0]).toHaveClass('font-semibold text-slate-900');
    expect(getAllByText('Button 2')[0]).not.toHaveClass('font-semibold text-slate-900');
    expect(getAllByText('Button 3')[0]).not.toHaveClass('font-semibold text-slate-900');
  });

  it('adds the className to the container', () => {
    setup(
      <ButtonGroups
        items={items}
        className="my-class"
        selectedId={1}
      />
    );

    expect(screen.getByTestId('TestId__button-groups')).toHaveClass('my-class');
  });
});
