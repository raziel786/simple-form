import { COLORS } from "../Utils/Colors";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const styles = {
  container: {
    margin: 2,
    backgroundColor: COLORS.errorBackground,
  },
  text: {
    color: COLORS.errorText,
    padding: 4,
  }
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <div style={styles.container}>
      <p data-testid="error-message" style={styles.text}>
        ⚠ {message}
      </p>
    </div>
  );
};

