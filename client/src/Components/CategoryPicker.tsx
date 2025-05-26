import ErrorMessage from "./ErrorMessage";

interface CategoryPickerProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  showOtherFieldFor?: string;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  placeholder?: string;
  otherLabel?: string;
  errorMessage?: string;
}

export default function CategoryPicker({
  label,
  options,
  value,
  onChange,
  showOtherFieldFor,
  otherValue,
  onOtherChange,
  placeholder = "Please choose an option",
  otherLabel = "Other",
  errorMessage = ""
}: CategoryPickerProps) {

  /**
   * if the given options are not sufficient,
   * the user can select `Other` (or its associated value)
   * and free type their option
   */
  const isOtherSelected = value === showOtherFieldFor;

  return (
    <div data-testid="category-picker">
      <h4>{label}</h4>
      <select value={value}
        aria-label={isOtherSelected ? value : otherValue}
        onChange={(e) => {
          const selected = e.target.value;
          onChange(selected);
          if (selected !== showOtherFieldFor && onOtherChange) {
            onOtherChange("");
          }
        }}>
        <option value="">{`-- ${placeholder} --`}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option === showOtherFieldFor ? otherLabel : option}
          </option>
        ))}
      </select>

      {isOtherSelected && onOtherChange && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={otherValue}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder={`Describe the ${label.toLowerCase()}`}
          />
        </div>
      )}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

