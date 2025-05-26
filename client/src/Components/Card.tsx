import { ReactNode } from 'react';

const cardStyle = {
  backgroundColor: 'lightblue',
  padding: 20,
  marginBottom: 8,
  borderRadius: 4,
};

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div style={cardStyle}>{children}</div>;
}