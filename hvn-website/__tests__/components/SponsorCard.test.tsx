import { render, screen } from '../test-utils';
import { SponsorCard } from '@/components/SponsorCard';

describe('SponsorCard', () => {
  const mockSponsor = {
    id: 1,
    attributes: {
      name: 'Test Sponsor',
      organization: 'Test Org',
      description: 'Test Description',
      tier: 'gold',
      website: 'https://test.com',
      logo: {
        data: {
          attributes: {
            url: '/test-logo.jpg'
          }
        }
      }
    }
  };

  it('renders sponsor information correctly', () => {
    render(<SponsorCard sponsor={mockSponsor} />);
    
    expect(screen.getByText('Test Sponsor')).toBeInTheDocument();
    expect(screen.getByText('Test Org')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('displays correct sponsor tier', () => {
    render(<SponsorCard sponsor={mockSponsor} />);
    
    expect(screen.getByText('GOLD SPONSOR')).toBeInTheDocument();
  });

  it('renders website link when provided', () => {
    render(<SponsorCard sponsor={mockSponsor} />);
    
    const link = screen.getByText('Visit Website');
    expect(link).toHaveAttribute('href', 'https://test.com');
  });
});
