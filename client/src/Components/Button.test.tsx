import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

const label = 'Test Button';

describe('When the button is rendered with the prop `label` populated', () => {
  it('Then the label will appear on the button', () => {
    render(<Button label={label} onClick={() => { }} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName(label);
  });

  it('Then it has the correct aria-label when ariaLabel prop is provided', () => {
    const ariaLabel = 'Custom Aria Label';
    render(<Button label={label} onClick={() => { }} ariaLabel={ariaLabel} />);
    const button = screen.getByRole('button', { name: ariaLabel });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName(ariaLabel);
  });
});

describe('When the button is not disabled and is clicked', () => {
  it('Then the `onClick` handler is called', () => {
    const handleClick = jest.fn();
    render(<Button label={label} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('And the cursor will show a `pointer` over the button', () => {
    render(<Button label={label} onClick={() => { }} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toHaveStyle('cursor: pointer');
  });

  it('And the button has aria-disabled="false"', () => {
    render(<Button label={label} onClick={() => { }} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toHaveAttribute('aria-disabled', 'false');
  });
});

describe('When the button is disabled and is clicked', () => {
  it('Then the `onClick` handler is not called', () => {
    const handleClick = jest.fn();
    render(<Button label={label} onClick={handleClick} disabled />);
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('And the cursor will show `not-allowed` over the button', () => {
    render(<Button label={label} disabled onClick={() => { }} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toHaveStyle('cursor: not-allowed');
  });

  it('And the button has aria-disabled="true"', () => {
    render(<Button label={label} disabled onClick={() => { }} />);
    const button = screen.getByRole('button', { name: label });
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });
});
