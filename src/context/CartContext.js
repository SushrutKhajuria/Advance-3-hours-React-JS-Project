import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/764d634f2583411287bedbea92788167';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`);
      setCart(res.data || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCart([]);
    }
  };

  const updateCartOnServer = async (updatedCart) => {
    try {
      
      await axios.delete(`${API_URL}/cart`);
      
      if (updatedCart.length > 0) {
        await axios.post(`${API_URL}/cart`, updatedCart);
      }
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
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
    await updateCartOnServer(updatedCart);
  };

  const clearCart = async () => {
    setCart([]);
    await axios.delete(`${API_URL}/cart`);
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