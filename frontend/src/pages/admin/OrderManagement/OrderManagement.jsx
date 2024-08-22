import { React, useState, useEffect, useContext } from 'react';
import '../../../assets/css/admin/OrderManagement.css';
import OrderManagementContext from '../../../context/admin/OrderManagementContext';
import { AiFillProduct } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { TbListDetails } from "react-icons/tb";

function OrderManagement() {

  const { getOrders, orders } = useContext(OrderManagementContext);
  const navigate = useNavigate();

  const viewProductDetails = (productId) => {
    navigate(`/admin/inventory/edit-product/${productId}`);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='inventory-page'>
      <div className="inventory-container">
        <div className="header">
          <div className="heading">
            <AiFillProduct size={25} color={'#0451a9'} />
            <h3>Order Management</h3>
          </div>
          <div className="header-actions">
            <input type="text" id='product-search' placeholder='Search' />
            <button className="product-export admin-btn light-btn">Export</button>
            <a className='product-add admin-btn dark-btn' href='/admin/add-product'>Add Item</a>
          </div>
        </div>
      </div>

      <div className="inventory-table-container">
        <table className='inventory-table' cellSpacing={0} cellPadding={10}>
          <thead className='table-header'>
            <tr className='table-header-row'>
              <td>Order Id</td>
              <td>Username</td>
              <td>Cart Total</td>
              <td>Item Quantity</td>
              <td>Pending Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              let status;

              if (order.pending_status === 'Confirmed') {
                status = <span className='confirmed_status'>Confirmed</span>;
              } else if (order.pending_status === 'Pending') {
                status = <span className='pending_status'>Pending</span>;
              } else if (order.pending_status === 'Rejected') {
                status = <span className='rejected_status'>Rejected</span>;
              } else {
                status = null;
              }

              return (
                <tr className='item-row' key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user.username}</td>
                  <td>{order.order.get_cart_total}</td>
                  <td>{order.order.get_cart_quantity}</td>
                  <td>{status}</td>
                  <td className='action-box'>
                    <Link to={`order/${order.id}`} state={{ order }}>
                      <TbListDetails className='action' size={20} color={'#0451a9'} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
