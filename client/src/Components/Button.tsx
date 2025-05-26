import React from 'react';
import { COLORS } from '../Utils/Colors';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

function getBackgroundColor(disabled: boolean, isHovered: boolean) {
  if (disabled) return COLORS.disabled;
  if (isHovered) return COLORS.primaryHover;
  return COLORS.primary;
}

export default function Button({ label, onClick, disabled = false, ariaLabel }: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const styles = {
    padding: '10px 20px',
    backgroundColor: getBackgroundColor(disabled, isHovered),
    color: disabled ? COLORS.disabledText : COLORS.text,
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: disabled ? 'none' : '0 2px 5px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel || label}
      style={styles}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
}
