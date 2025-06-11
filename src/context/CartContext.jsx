'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session } = useSession();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart data when user session changes
  useEffect(() => {
    if (session?.user) {
      // In a real app, you would fetch the user's cart from your backend
      const savedCart = localStorage.getItem(`cart_${session.user.id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      // For non-authenticated users, use a temporary cart
      const tempCart = localStorage.getItem('temp_cart');
      if (tempCart) {
        setCart(JSON.parse(tempCart));
      }
    }
    setLoading(false);
  }, [session]);

  // Save cart data when it changes
  useEffect(() => {
    if (!loading) {
      if (session?.user) {
        localStorage.setItem(`cart_${session.user.id}`, JSON.stringify(cart));
      } else {
        localStorage.setItem('temp_cart', JSON.stringify(cart));
      }
    }
  }, [cart, session, loading]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 