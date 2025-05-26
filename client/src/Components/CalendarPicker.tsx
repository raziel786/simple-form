import DatePicker from "react-datepicker";
import ErrorMessage from './ErrorMessage';

import "react-datepicker/dist/react-datepicker.css";

interface CalendarPickerProps {
  label?: string,
  placeholder?: string,
  maxDate: Date,
  selectedDate: Date | null,
  onChange: (date: Date | null) => void
  ariaDescribedBy?: string;
  errorMessage?: string;

}


export default function CalendarPicker({ label, placeholder, maxDate,
  selectedDate, onChange, ariaDescribedBy, errorMessage = "" }: CalendarPickerProps) {
  return (
    <div data-testid="calendar-picker">
      <h4>{label}</h4>
      <DatePicker
        data-testid="calendar-input"
        placeholderText={placeholder}
        maxDate={maxDate}
        selected={selectedDate}
        onChange={(date) => onChange(date)}
        aria-label={label}
        aria-describedby={ariaDescribedBy}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};