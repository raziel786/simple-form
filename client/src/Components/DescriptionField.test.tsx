import { fireEvent, render, screen } from '@testing-library/react';
import DescriptionField from './DescriptionField';

describe('When the Description Field is rendered with default props', () => {
  it('Then it shows the default label, placeholder, and a textarea', () => {
    render(<DescriptionField onChange={() => null} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});

describe('When the Description Field is rendered with custom label and placeholder', () => {
  it('Then it shows the custom label and placeholder', () => {
    render(<DescriptionField onChange={() => null} label="Custom Label" placeholder="Write here..." />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write here...')).toBeInTheDocument();
  });
});

describe('When the rows prop is set', () => {
  it('Then the textarea respects the rows value', () => {
    render(<DescriptionField onChange={() => null} rows={6} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
  });
});


describe('When the Description Field is rendered with an onChange handler', () => {
  it('Then the onChange is called with the new value when the user types', () => {
    const handleChange = jest.fn();
    render(<DescriptionField value="Controlled" onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New controlled value' } });
    expect(handleChange).toHaveBeenCalledWith('New controlled value');
  });
});
