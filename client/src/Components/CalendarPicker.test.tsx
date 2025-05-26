import { fireEvent, render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import CalendarPicker from './CalendarPicker';

const FIXED_TODAY = new Date(2025, 0, 15);
const FIXED_TOMORROW = new Date(2025, 0, 16);

describe('When the component is rendered with a label', () => {
  it('Then the label appears in the document', () => {
    render(
      <CalendarPicker
        label="Select a date"
        placeholder="Choose..."
        maxDate={FIXED_TOMORROW}
        selectedDate={null}
        onChange={() => { }}
      />
    );
    expect(screen.getByText('Select a date')).toBeInTheDocument();
  });
});

describe('When the component is rendered with a placeholder', () => {
  it('Then the placeholder appears in the input field', () => {
    render(
      <CalendarPicker
        placeholder="Pick a date"
        maxDate={FIXED_TOMORROW}
        selectedDate={null}
        onChange={() => { }}
      />
    );
    expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument();
  });
});

describe('When a user selects a date', () => {
  it('Then the `onChange` handler is called with the selected date', () => {
    const handleChange = jest.fn();

    render(
      <CalendarPicker
        placeholder="Pick a date"
        maxDate={FIXED_TOMORROW}
        selectedDate={null}
        onChange={handleChange}
      />
    );

    const input = screen.getByPlaceholderText('Pick a date');
    fireEvent.click(input);

    const day = screen.getByText(`${FIXED_TODAY.getDate()}`);
    fireEvent.click(day);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

describe('When a selected date is provided to the component', () => {
  it('Then the input field displays the formatted date', () => {
    render(
      <CalendarPicker
        placeholder="Pick a date"
        maxDate={FIXED_TOMORROW}
        selectedDate={FIXED_TODAY}
        onChange={() => { }}
      />
    );

    const formattedDate = format(FIXED_TODAY, 'MM/dd/yyyy');
    const input = screen.getByDisplayValue(formattedDate);
    expect(input).toBeInTheDocument();
  });
});
