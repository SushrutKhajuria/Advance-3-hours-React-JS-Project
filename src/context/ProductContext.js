
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    const mockProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(mockProducts);
  };


  const addProduct = async (product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
    
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