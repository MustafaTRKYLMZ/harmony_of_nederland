import { formatDate, isUpcoming, sortEventsByDate } from '../../utils/date';

describe('Date Utils', () => {
  const mockEvents = [
    { id: 1, Date: '2025-01-28', title: 'Event 1' },
    { id: 2, Date: '2025-02-15', title: 'Event 2' },
    { id: 3, Date: '2024-12-25', title: 'Event 3' },
  ];

  describe('formatDate', () => {
    it('formats date correctly for English locale', () => {
      const date = new Date('2025-01-28');
      expect(formatDate(date, 'en')).toBe('January 28, 2025');
    });

    it('formats date correctly for Dutch locale', () => {
      const date = new Date('2025-01-28');
      expect(formatDate(date, 'nl')).toBe('28 januari 2025');
    });

    it('handles invalid dates', () => {
      expect(formatDate(null, 'en')).toBe('TBA');
    });
  });

  describe('isUpcoming', () => {
    it('identifies upcoming events correctly', () => {
      const pastEvent = { Date: '2023-01-01' };
      const futureEvent = { Date: '2025-12-31' };
      
      expect(isUpcoming(pastEvent)).toBe(false);
      expect(isUpcoming(futureEvent)).toBe(true);
    });

    it('handles events without dates', () => {
      const noDateEvent = { Date: null };
      expect(isUpcoming(noDateEvent)).toBe(true);
    });
  });

  describe('sortEventsByDate', () => {
    it('sorts events by date correctly', () => {
      const sorted = sortEventsByDate(mockEvents);
      expect(sorted[0].title).toBe('Event 3');
      expect(sorted[2].title).toBe('Event 2');
    });

    it('handles events with null dates', () => {
      const eventsWithNull = [...mockEvents, { id: 4, Date: null, title: 'No Date Event' }];
      const sorted = sortEventsByDate(eventsWithNull);
      expect(sorted[sorted.length - 1].title).toBe('No Date Event');
    });
  });
});
