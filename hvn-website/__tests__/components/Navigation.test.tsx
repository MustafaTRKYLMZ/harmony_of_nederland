import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../../components/Navigation';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      locale: 'en',
      push: jest.fn(),
      pathname: '/',
    }));
  });

  it('renders all navigation links', () => {
    render(<Navigation />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Sponsors')).toBeInTheDocument();
  });

  it('handles language switching', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      locale: 'en',
      push: mockPush,
      pathname: '/',
    }));

    render(<Navigation />);
    
    const languageSwitch = screen.getByLabelText('Switch Language');
    fireEvent.click(languageSwitch);
    
    expect(mockPush).toHaveBeenCalled();
  });

  it('shows active link styling', () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      locale: 'en',
      pathname: '/events',
    }));

    render(<Navigation />);
    
    const eventsLink = screen.getByText('Events');
    expect(eventsLink.closest('a')).toHaveClass('active');
  });

  it('toggles mobile menu', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByLabelText('Toggle Navigation');
    fireEvent.click(menuButton);
    
    expect(screen.getByRole('menu')).toBeVisible();
  });
});
