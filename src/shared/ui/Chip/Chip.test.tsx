import { screen } from '@testing-library/react';
import { setup } from 'shared/lib/testing';

import { Chip } from './Chip';

describe('Chip component', () => {
  test('should render the label correctly', () => {
    setup(<Chip label="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('should call the onClick handler when the action icon is clicked', async () => {
    const onClick = jest.fn();

    const { user } = setup(
      <Chip
        label="test"
        onClick={onClick}
        id="test"
        actionIcon="delete"
      />
    );

    const button = screen.getByRole('button');

    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('should render the action icon', () => {
    setup(
      <Chip
        label="test"
        actionIcon="delete"
      />
    );
    expect(screen.getByText('delete')).toBeInTheDocument();
  });

  test('should not render the action icon', () => {
    setup(<Chip label="test" />);
    expect(screen.queryByText('delete')).not.toBeInTheDocument();
  });

  test('should have the disabled class', () => {
    setup(
      <Chip
        label="test"
        isDisabled
        actionIcon="delete"
      />
    );
    expect(screen.getByRole('button')).toHaveClass('disabled');
  });

  test('should call the onClick handler with the undefined value when the action icon is clicked and there is no id', async () => {
    const onClick = jest.fn();

    const { user } = setup(
      <Chip
        label="test"
        onClick={onClick}
        actionIcon="delete"
      />
    );

    const button = screen.getByRole('button');

    await user.click(button);
    expect(onClick).toHaveBeenCalledWith(undefined);
  });

  test('should call the onClick handler with the id value when clicked and there is an id', async () => {
    const onClick = jest.fn();

    const { user } = setup(
      <Chip
        label="test"
        onClick={onClick}
        id="test"
        actionIcon="delete"
      />
    );

    const button = screen.getByRole('button');

    await user.click(button);
    expect(onClick).toHaveBeenCalledWith('test');
  });

  test('should not have as a false', () => {
    setup(
      <Chip
        label="test"
        isDisabled={false}
        actionIcon="delete"
      />
    );
    expect(screen.getByRole('button')).not.toHaveClass('false');
  });
});
