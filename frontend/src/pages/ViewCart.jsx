import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

function ViewCart() {
  const { cart, manageQuantity} = useContext(CartContext);



  if (cart === null) {
    return <div>Loading...</div>;  // Show a loading state while fetching the cart
  }

  return (
    <div>
      <h1>Cart Items: {cart.get_cart_total}</h1>
      <h2>Cart Quantity: {cart.get_cart_quantity}</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity}
            <button onClick={() => manageQuantity('deduct', item.product.id)}>-</button> <button onClick={() => manageQuantity('add', item.product.id)}>+</button><button onClick={() => {manageQuantity('delete', item.product.id)}}>Delete Product</button>
          </li>
        
          
        ))}
      </ul>

      
      
    </div>
  );
}

export default ViewCart;
