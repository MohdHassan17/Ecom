import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ProductManagementContext from '../../../context/admin/ProductManagementContext';

function EditProduct() {
  const { id } = useParams();  // Destructuring the id parameter from the URL

  
  const {editProducts, setEditProducts, setEditImage, editUploadImage} = useContext(ProductManagementContext)

  const handleChange = (e) => {
    setEditProducts({ ...editProducts, [e.target.name]: e.target.value })
  
    
  }

  const handleImgChange = (e) => {
    setEditImage(e.target.files[0])
   
  }


  const getProduct = async () => {
    try{

      const response = await axios.get(`http://127.0.0.1:8000/store/product-detail/${id}`);
      console.log(response.status)
      console.log(response.data)
      setEditProducts(response.data)
     
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(
    ()=>{
      getProduct()
    }, []
  )
  return (
    <div>

      <div className="add-product-form-container">
        <form className='add-product-form' onSubmit={(e) => {editUploadImage(e,id)}}>
          <div className="inputs">
            <input type="file" name="" className='input-text input-file' onChange={handleImgChange}   id="" />
            <input type="text" className='input-text' name="name" placeholder='Name' onChange={handleChange} value={editProducts.name} id="" />
            <input type="number" className='input-text' name="price" placeholder='Price'  onChange={handleChange} value={editProducts.price}  id="" />
            <input type="number" className='input-text' name="available_quantity" placeholder='Quantity' onChange={handleChange} value={editProducts.available_quantity}  id="" />
          </div>

          <textarea name="description" id="" className="input-description" onChange={handleChange} value={editProducts.description} ></textarea>


          <input type="submit" value='Create Product' className='btn positive-btn submit-btn' />

        </form>
      </div>
    </div>
  )
}

export default EditProduct