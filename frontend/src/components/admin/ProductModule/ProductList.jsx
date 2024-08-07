import {React, useState, useEffect, useContext} from 'react'
import '../../../assets/css/admin/ProductModule/ProductList.css'
import ProductManagementContext from '../../../context/admin/ProductManagementContext'
import Img from '../../../assets/images/beef.png'
import { useNavigate } from 'react-router-dom'


function ProductList() {

  const {products, handleDelete} = useContext(ProductManagementContext)
  const navigate = useNavigate()
  const viewProductDetails = (productId) => {
    navigate(`/admin/inventory/edit-product/${productId}`)
   
}
  return (
    <div>

      <div className="product-list">
      {
            products.map((product)=>(
                <div className='product-list-card' key={product.id}>
                   
                   <div className="product-list-details">
                      <div className="product-list-img-container">
                          <img src={product.image ? product.image : Img} className='product-list-img' alt="" />
                      </div>

                      <div className="product-list-text-container">
                        <h4>{product.name}</h4>
                        <h5>Qty: {product.available_quantity}</h5>
                      </div>
                   </div>

                   <div className="product-list-action">
                    <a  className='btn positive-btn' onClick={() => {viewProductDetails(product.id)}}>Edit</a>
                    <a className='btn negative-btn' onClick={()=>{handleDelete(product.id)}}>Delete</a>
                   </div>
                   


                </div>
            ))
        }
      </div>
        

    </div>
  )
}

export default ProductList