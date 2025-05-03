// context/CartContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const mockCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(mockCart);
  };

  const addToCart = async (item) => {
    const existingItem = cart.find(i => i.id === item.id && i.size === item.size);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map(i => 
        i.id === item.id && i.size === item.size 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};