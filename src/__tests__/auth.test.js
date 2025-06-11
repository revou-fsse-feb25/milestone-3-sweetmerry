import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import LoginPage from '@/app/login/page';
import { CartProvider } from '@/context/CartContext';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
  SessionProvider: ({ children }) => children,
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ ok: true });
    require('next-auth/react').signIn = mockSignIn;

    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'user@example.com',
        password: 'password',
        redirect: false,
      });
    });
  });

  it('handles login error', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({ error: 'Invalid credentials' });
    require('next-auth/react').signIn = mockSignIn;

    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
}); 