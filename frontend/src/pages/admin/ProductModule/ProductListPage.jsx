import React from 'react'
import ProductList from '../../../components/admin/ProductModule/ProductList'
import '../../../assets/css/admin/ProductModule/ProductList.css'
import { AiFillProduct, AiOutlineSearch } from 'react-icons/ai'

function ProductListPage() {
  return (
    <div className='inventory-page'>

      <div className="inventory-container">

        <div className="header">
          <div className="heading">
            <AiFillProduct size={25} color={'#0451a9'} />
            <h3>Product Management</h3>
          </div>
          <div className="header-actions">
            <input type="text" id='product-search' placeholder='Search' />
            <button className="product-export admin-btn light-btn">Export</button>
            <a className='product-add admin-btn dark-btn' href='/admin/add-product'>Add Item</a>
          </div>
        </div>


        




      </div>






      <ProductList />
    </div>
  )
}

export default ProductListPage