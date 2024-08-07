import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Renamed context and provider
const OrderManagementContext = createContext();

export default OrderManagementContext;

export const OrderManagementProvider = ({ children }) => {

  const navigate = useNavigate()


  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/admin/view-orders/");
      setOrders(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const manageOrderStatus = (id, pending_status) =>{
    
    axios.patch(`http://127.0.0.1:8000/admin/manage-order-status/${id}`, {pending_status: pending_status})
    .then(response =>{
      console.log(response.data)

    })
    .catch(error =>{
      console.log(error)
    })

    console.log(pending_status)

  
  }




  



  const context = {
    getOrders: getOrders,
    orders: orders,
    manageOrderStatus: manageOrderStatus

  };

  return (
    <OrderManagementContext.Provider value={context}>
      {children}
    </OrderManagementContext.Provider>
  );
};
