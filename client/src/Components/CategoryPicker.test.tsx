import { fireEvent, render, screen } from '@testing-library/react';
import CategoryPicker from './CategoryPicker';

const label = 'Category';
const options = ['Option A', 'Option B', 'Other'];
const showOtherFieldFor = 'Other';

describe('When the CategoryPicker is rendered', () => {
  it('Then it shows the label and all options', () => {
    render(
      <CategoryPicker
        label={label}
        options={options}
        value=""
        onChange={() => { }}
      />
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText('-- Please choose an option --')).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeInTheDocument();
    });
  });
});

describe('When an option is selected', () => {
  it('Then the onChange handler is called with the selected option', () => {
    const handleChange = jest.fn();

    render(
      <CategoryPicker
        label={label}
        options={options}
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Option B' },
    });

    expect(handleChange).toHaveBeenCalledWith('Option B');
  });
});

describe('When the "Other" option is selected', () => {
  it('Then the "other" input field appears with the current otherValue', () => {
    render(
      <CategoryPicker
        label={label}
        options={options}
        value="Other"
        onChange={() => { }}
        showOtherFieldFor={showOtherFieldFor}
        otherValue="Custom value"
        onOtherChange={() => { }}
      />
    );

    expect(screen.getByPlaceholderText('Describe the category')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Custom value')).toBeInTheDocument();
  });

  it('And when typing in the "other" input field, onOtherChange is called', () => {
    const handleOtherChange = jest.fn();

    render(
      <CategoryPicker
        label={label}
        options={options}
        value="Other"
        onChange={() => { }}
        showOtherFieldFor={showOtherFieldFor}
        otherValue=""
        onOtherChange={handleOtherChange}
      />
    );

    const input = screen.getByPlaceholderText('Describe the category');
    fireEvent.change(input, { target: { value: 'Custom Input' } });

    expect(handleOtherChange).toHaveBeenCalledWith('Custom Input');
  });
});

describe('When a non-"Other" option is selected after "Other"', () => {
  it('Then onChange is called with the new option and onOtherChange clears the otherValue', () => {
    const handleChange = jest.fn();
    const handleOtherChange = jest.fn();

    render(
      <CategoryPicker
        label={label}
        options={options}
        value=""
        onChange={handleChange}
        showOtherFieldFor={showOtherFieldFor}
        otherValue="Something"
        onOtherChange={handleOtherChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Option A' },
    });

    expect(handleChange).toHaveBeenCalledWith('Option A');
    expect(handleOtherChange).toHaveBeenCalledWith('');
  });
});
