import React from "react";
import ErrorMessage from "./ErrorMessage";

interface TextAreaFieldProps {
  id?: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  errorMessage?: string;
}

export default function DescriptionField({ label = "Description", value, onChange,
  placeholder = "Enter text...", rows = 4, errorMessage = "" }: TextAreaFieldProps) {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)

  return (
    <div data-testid="description-field" style={{ marginTop: "10px" }}>
      {label && <h4>{label}</h4>}
      <textarea
        value={value}
        onChange={handleChange}
        rows={rows}
        style={{ width: "100%", resize: "vertical" }}
        placeholder={placeholder}
        aria-describedby={placeholder}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

