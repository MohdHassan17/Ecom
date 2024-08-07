import {React, useContext, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderDetailsPDF from '../../../components/admin/OrderDetailsPDF';
import '../../../assets/css/admin/OrderManagement.css';
import OrderManagementContext from '../../../context/admin/OrderManagementContext';

const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state;
  console.log(order)



  const {manageOrderStatus} = useContext(OrderManagementContext)

  const [status, setStatus] = useState(order.pending_status)

  const handleStatusChange = (status) =>{
    setStatus(status)
  }

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <div className="order-card">
        <div className="order-info">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong style={{color:'red'}}>Order Status: {status} </strong></p>
          <p><strong>Username:</strong> {order.user.username}</p>
          <p><strong>Total:</strong> {order.order.get_cart_total}</p>
          <p><strong>Items:</strong> {order.order.get_cart_quantity}</p>
          <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        </div>
        <div className="order-items">
          <h2>Items</h2>
          {order.order.items.map(item => (
            <div key={item.id} className="order-item">
              <img src={item.product.image} alt={item.product.name} className="product-image"/>
              <div className="item-details">
                <p><strong>Product:</strong> {item.product.name}</p>
                <p><strong>Description:</strong> {item.product.description}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> ${item.product.price}</p>
                <p><strong>Total:</strong> ${item.get_total}</p>
              
              </div>
            </div>
          ))}
        </div>
        <div className="shipping-info">
          <h2>Shipping Address</h2>
          <p>{order.shipping.address_line1}, {order.shipping.address_line2}</p>
          <p>{order.shipping.city}, {order.shipping.province}, {order.shipping.zip_code}</p>
        </div>
      </div>

      <div className="order-detail-action">
        
      <PDFDownloadLink
        document={<OrderDetailsPDF order={order} />}
        fileName={`order_${order.id}.pdf`}
        style={{
          textDecoration: 'none',
          padding: '10px',
          color: '#fff',
          backgroundColor: '#007bff',
          borderRadius: '5px',
          marginTop: '20px'
        }}
      >
        {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
      </PDFDownloadLink>

      <a  className='btn positive-btn' onClick={()=>{manageOrderStatus(`${order.id}`, 'Confirmed'); handleStatusChange('Confirmed') }} >Approve</a>
      <a className='btn negative-btn' onClick={()=>{manageOrderStatus(`${order.id}`, 'Confirmed'); handleStatusChange('Rejected') }}  >Reject</a>
      </div>
      
    </div>
  );
};

export default OrderDetails;
