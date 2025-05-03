
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/d919668b711046f698055156928133bf'; 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

 
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  
  const addProduct = async (product) => {
    try {
      const res = await axios.post(`${API_URL}/products`, product);
      setProducts([...products, res.data]);
    } catch (err) {
      console.error("Failed to add product:", err);
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