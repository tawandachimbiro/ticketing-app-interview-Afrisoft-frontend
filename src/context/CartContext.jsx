import { createContext, useContext, useState, useEffect } from 'react';
import { calculateTotal } from '../utils/helpers';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    event: null,
    tickets: [],
    customerInfo: null,
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const setEvent = (event) => {
    setCart((prev) => ({
      ...prev,
      event,
      tickets: [], // Reset tickets when changing event
    }));
  };

  const addTicket = (ticketType) => {
    setCart((prev) => {
      const existingTicket = prev.tickets.find((t) => t.category === ticketType.category);
      
      if (existingTicket) {
        // Update quantity
        return {
          ...prev,
          tickets: prev.tickets.map((t) =>
            t.category === ticketType.category
              ? { ...t, quantity: t.quantity + 1 }
              : t
          ),
        };
      } else {
        // Add new ticket
        return {
          ...prev,
          tickets: [...prev.tickets, { ...ticketType, quantity: 1 }],
        };
      }
    });
  };

  const removeTicket = (category) => {
    setCart((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((t) => t.category !== category),
    }));
  };

  const updateTicketQuantity = (category, quantity) => {
    if (quantity <= 0) {
      removeTicket(category);
      return;
    }
    
    setCart((prev) => ({
      ...prev,
      tickets: prev.tickets.map((t) =>
        t.category === category ? { ...t, quantity } : t
      ),
    }));
  };

  const setCustomerInfo = (info) => {
    setCart((prev) => ({
      ...prev,
      customerInfo: info,
    }));
  };

  const clearCart = () => {
    setCart({
      event: null,
      tickets: [],
      customerInfo: null,
    });
    localStorage.removeItem('cart');
  };

  const getTotal = () => {
    return calculateTotal(cart.tickets);
  };

  const getTicketCount = () => {
    return cart.tickets.reduce((total, ticket) => total + ticket.quantity, 0);
  };

  const value = {
    cart,
    setEvent,
    addTicket,
    removeTicket,
    updateTicketQuantity,
    setCustomerInfo,
    clearCart,
    getTotal,
    getTicketCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
