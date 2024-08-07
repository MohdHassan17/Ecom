// ProductContext.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export default ProductContext;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/store/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  const context = {
    products: products,
  };

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};
