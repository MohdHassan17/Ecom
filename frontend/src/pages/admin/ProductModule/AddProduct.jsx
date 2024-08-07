import {React, useContext, useState }from 'react'
import '../../../assets/css/admin/ProductModule/AddProduct.css'
import ProductManagementContext from '../../../context/admin/ProductManagementContext'

function AddProduct() {

  const {addProductDetails, setAddProductDetails, setProductImg, uploadImage} = useContext(ProductManagementContext)

  const handleChange = (e) => {
    setAddProductDetails({ ...addProductDetails, [e.target.name]: e.target.value })
    
  }

  const handleImgChange = (e) => {
    setProductImg(e.target.files[0])
   
  }

  return (
    <div>

      <div className="add-product-form-container">
        <form className='add-product-form' onSubmit={uploadImage}>
          <div className="inputs">
            <input type="file" name="" className='input-text input-file' onChange={handleImgChange}  id="" />
            <input type="text" className='input-text' name="name" placeholder='Name' onChange={handleChange} id="" />
            <input type="number" className='input-text' name="price" placeholder='Price'  onChange={handleChange} id="" />
            <input type="number" className='input-text' name="available_quantity" placeholder='Quantity' onChange={handleChange} id="" />
          </div>

          <textarea name="description" id="" className="input-description" onChange={handleChange} ></textarea>


          <input type="submit" value='Create Product' className='btn positive-btn submit-btn' />

        </form>
      </div>
    </div>
  )
}

export default AddProduct