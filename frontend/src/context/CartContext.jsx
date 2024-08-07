import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';


const CartContext = createContext();

export default CartContext;

export const CartProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);

  const [cart, setCart] = useState(null);  


  // Get Cart Function: This function gets all the cart related data that is stored for a
const getCart = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/store/view-cart/',
        {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {  // Check for 200 status
     

          setCart(response.data);
      } else {
        console.error('Could not fetch the cart');
      }
    } catch (error) {
      console.error('Error fetching the cart:', error);
    }}
  // }; 
  
  useEffect(() => {
    if (authTokens) {  // Ensure authTokens is available before fetching
      getCart();
    }
    else{
        console.log('please login')
    }
  },[authTokens]);

// Add To Cart: This function takes a product id and adds it to cart
const addToCart = async (productId) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/store/add-to-cart/",
            { product_id: productId },
            {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        getCart()
        console.log('Item added successfully:', response.data)
    } catch (error) {
        console.error("Error adding item to cart:", error)
    }
}




const manageQuantity = async (method, productId) => {
  // Optimistic UI update
  const updatedCart = { ...cart };
  const itemIndex = updatedCart.items.findIndex(item => item.product.id === productId);

  if (itemIndex === -1) return;

  if (method === 'add') {
    updatedCart.items[itemIndex].quantity += 1;
  } else if (method === 'deduct') {
    if (updatedCart.items[itemIndex].quantity > 1) {
      updatedCart.items[itemIndex].quantity -= 1;
    } else {
      updatedCart.items.splice(itemIndex, 1);
    }
  }

  setCart(updatedCart);

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/store/manage-quantity/',
      { method: method, productId: productId },
      {
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status !== 200 && response.status !== 204) {
      throw new Error('Failed to update cart');
    }

    // Optionally update the cart again from the server response to ensure consistency
    getCart();

  } catch (error) {
    console.error('Error managing cart item quantity:', error);
    // Revert the optimistic update in case of an error
    getCart();
  }
};





  const context = {
    cart: cart,
    addToCart: addToCart,
    manageQuantity: manageQuantity
  };

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
}
