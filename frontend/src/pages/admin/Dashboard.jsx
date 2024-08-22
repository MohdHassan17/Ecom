import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillProduct } from "react-icons/ai";
import { MdDiscount } from "react-icons/md";

import '../../assets/css/admin/Dashboard.css'

function Dashboard() {

  const [dashboardData, setDashboardData] = useState([])


  const getDashboardData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/admin/dashboard/')
      console.log(response.data)
      setDashboardData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])




  return (
    <div className="dashboard-container">
      <div className="dashboard-orders" >

        <h3 className='dashboard-heading'>Total Orders Placed Today</h3>
        <h1 className='dashboard-data'> {dashboardData.total_orders}</h1>

      </div>

      <div className="dashboard-revenue">
        <h3 className='dashboard-heading'>Total Revenue</h3>
        <h1 className='dashboard-data'> ${dashboardData.total_revenue}</h1>

      </div>

      <div className="dashboard-pending">
        <h3 className='dashboard-heading'>Pending Orders</h3>
        <h1 className='dashboard-data'> {dashboardData.pending_orders} </h1>
      </div>

      <div className="dashboard-list">
        <div className="dashboard-heading-container">
          <h3 className='dashboard-list-heading'> <AiFillProduct size={15} color={'#0451a9'} /> Top 5 Selling Products</h3>
        </div>
        <div className="dashboard-product-list">
         
            {dashboardData && dashboardData.top_selling_products ? (
              dashboardData.top_selling_products.map((product) => (
                <div className="dashboard-product">
                <h6 className="dashboard-product-name">{product.product__name}</h6>
                <h6><MdDiscount/>{product.total_sold}</h6>
              </div>
              ))
            ) : (
              <p>Nothing</p>
            )}
          </div>

        </div>


      </div>
      )
}

      export default Dashboard