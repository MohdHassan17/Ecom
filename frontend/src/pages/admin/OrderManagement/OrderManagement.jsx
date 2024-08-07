import {React, useState, useEffect, useContext} from 'react'
import '../../../assets/css/admin/OrderManagement.css'
import OrderManagementContext from '../../../context/admin/OrderManagementContext'

import { useNavigate, Link } from 'react-router-dom'


function OrderManagement() {

  const {getOrders, orders} = useContext(OrderManagementContext)
  const navigate = useNavigate()
  const viewProductDetails = (productId) => {
    navigate(`/admin/inventory/edit-product/${productId}`)
   
}


useEffect(() => {
   
  getOrders();
}, []);


console.log(orders)
  return (
    <div>

      <div className="product-list">
       {
            orders.map((order)=>(
                <div className='product-list-card' key={order.id}>
                   
                   <div className="product-list-details">
                     

                      <div className="product-list-text-container">
                        <h4>{order.user.name}</h4>
                        <h5>Total: {order.order.get_cart_total}</h5>
                      </div>
                   </div>

                   <div className="product-list-action">
                    <Link to={`order/${order.id}`} state={{order}}><a  className='btn positive-btn' >View Order</a></Link>
                 
                   </div>
                   


                </div>
            ))
        } 
      </div>
        

    </div>
  )
}

export default OrderManagement