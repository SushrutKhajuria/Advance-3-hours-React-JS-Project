import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/764d634f2583411287bedbea92788167'; 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err.response?.data || err.message);
      setProducts([]);
    }
  };

  const addProduct = async (product) => {
    try {
      console.log("🔼 Sending to API:", product); 
      const res = await axios.post(`${API_URL}/products`, product);
      console.log("✅ API Response:", res.data); 
      setProducts((prev) => [...prev, res.data]);
      return true;
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      return false;
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
