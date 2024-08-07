import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';  // Importing useParams hook
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();  // Destructuring the id parameter from the URL
  const { authTokens } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/store/product-detail/${id}`);
        console.log(response.status)
        console.log(response.data)
        console.log(response.headers
      
        )
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
   
      {/* Add other product details as needed */}
    </div>
  );
};

export default ProductDetails;
