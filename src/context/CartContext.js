import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/d919668b711046f698055156928133bf'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`);
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  
  const addToCart = async (item) => {
    try {
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

      await axios.put(`${API_URL}/cart`, updatedCart); 
      setCart(updatedCart);
    } catch (err) {
      console.error("Failed to update cart:", err);
    }
  };

  
  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart`);
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
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