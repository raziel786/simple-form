import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('When the Card component is rendered with children', () => {
  it('Then the children are displayed correctly', () => {
    render(<Card><p>Test content</p></Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
