import { render, screen } from '../test-utils';
import { EventCard } from '@/components/EventCard';
import { useRouter } from 'next/router';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('EventCard', () => {
  const mockEvent = {
    id: 1,
    Slug: 'test-event',
    title: 'Test Event',
    description: 'Test Description',
    Date: '2025-01-28',
    location: 'Amsterdam',
    Image: {
      url: '/test-image.jpg',
    },
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      locale: 'en',
    }));
  });

  it('renders event information correctly', () => {
    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/Amsterdam/)).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<EventCard event={mockEvent} />);
    
    // Check if the date is formatted according to the locale
    expect(screen.getByText(/January 28, 2025/)).toBeInTheDocument();
  });

  it('shows TBA when no date is provided', () => {
    const eventWithoutDate = { ...mockEvent, Date: null };
    render(<EventCard event={eventWithoutDate} />);
    
    expect(screen.getByText(/TBA/)).toBeInTheDocument();
  });
});
