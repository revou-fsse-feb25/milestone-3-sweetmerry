import { render, screen, fireEvent, act } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { CartProvider, useCart } from '@/context/CartContext';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: { id: '1', email: 'test@example.com' },
    },
  }),
  SessionProvider: ({ children }) => children,
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test component that uses the cart
function TestComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  
  return (
    <div>
      <button onClick={() => addToCart({ id: 1, price: 10 })}>Add Item</button>
      <button onClick={() => removeFromCart(1)}>Remove Item</button>
      <button onClick={() => updateQuantity(1, 2)}>Update Quantity</button>
      <div data-testid="cart-count">{getCartCount()}</div>
      <div data-testid="cart-total">{getCartTotal()}</div>
      <div data-testid="cart-items">{JSON.stringify(cart)}</div>
    </div>
  );
}

describe('Cart Context', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('adds item to cart', () => {
    render(
      <SessionProvider>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </SessionProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('10');
  });

  it('removes item from cart', () => {
    render(
      <SessionProvider>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </SessionProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Remove Item'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
  });

  it('updates item quantity', () => {
    render(
      <SessionProvider>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </SessionProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Update Quantity'));
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('20');
  });

  it('persists cart data in localStorage', () => {
    render(
      <SessionProvider>
        <CartProvider>
          <TestComponent />
        </CartProvider>
      </SessionProvider>
    );

    fireEvent.click(screen.getByText('Add Item'));
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart_1',
      expect.any(String)
    );
  });
}); 