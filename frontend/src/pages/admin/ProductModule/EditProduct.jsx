import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import imageCompression from 'browser-image-compression';

import ProductManagementContext from '../../../context/admin/ProductManagementContext';

function EditProduct() {
  const { id } = useParams();  // Destructuring the id parameter from the URL

  const fileTypes = ["JPG", "PNG", "GIF"];
  const {editProducts, setEditProducts, setEditImage, editUploadImage} = useContext(ProductManagementContext)

  const handleChange = (e) => {
    setEditProducts({ ...editProducts, [e.target.name]: e.target.value })
  
    
  }

  const handleImgChange = async (file) => {
    try {
      // Compression options with format change
      const options = {
        maxSizeMB: 0.5, // Max file size in MB
        maxWidthOrHeight: 1024, // Max width or height
        useWebWorker: true, // Enable multi-threading
        fileType: 'image/jpeg', // Convert to JPEG format
        // fileType: 'image/webp' // Uncomment this line to convert to WebP instead
      };
      const compressedFile = await imageCompression(file, options);
      setEditImage(compressedFile);
    } catch (error) {
      console.error('Error compressing and converting the image:', error);
    }
  };


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


      <div className="inventory-container">
          <div className="header">
            <div className="heading">
              <AiFillEdit size={25} color={'#0451a9'} />
              <h3>Product Management</h3>
            </div>
          </div>
        </div>

        <form className='form' onSubmit={(e) => {editUploadImage(e,id)}}>
          <FileUploader
            handleChange={handleImgChange}
            name="file"
            types={fileTypes}
          />
          <div className="form-img-container"></div>

          <div className="input-container">
            <label htmlFor="name">Product Name:</label><br />
            <input type="text" className='input-text' name="name" placeholder='Name' onChange={handleChange} value={editProducts.name} id="" />
          </div>

          <div className="input-container">
            <label htmlFor="price">Product Price:</label><br />
            <input type="number" className='input-text' name="price" placeholder='Price' onChange={handleChange} value={editProducts.price} id="" />
          </div>

          <div className="input-container">
            <label htmlFor="available_quantity">Available Quantity:</label><br />
            <input type="number" className='input-text' name="available_quantity" placeholder='Quantity' onChange={handleChange} value={editProducts.available_quantity} id="" />
          </div>

          <div className="input-container">
            <label htmlFor="description">Description:</label><br />
            <textarea name="description" id="" className="input-description" onChange={handleChange} placeholder='Write something nice about your product...' value={editProducts.description}></textarea>
          </div>

          <input type="submit" value='Edit Product' className='admin-btn dark-btn submit-btn' />
        </form>



        {/* <form className='add-product-form' onSubmit={(e) => {editUploadImage(e,id)}}>
          <div className="inputs">
            <input type="file" name="" className='input-text input-file' onChange={handleImgChange}   id="" />
            <input type="text" className='input-text' name="name" placeholder='Name' onChange={handleChange} value={editProducts.name} id="" />
            <input type="number" className='input-text' name="price" placeholder='Price'  onChange={handleChange} value={editProducts.price}  id="" />
            <input type="number" className='input-text' name="available_quantity" placeholder='Quantity' onChange={handleChange} value={editProducts.available_quantity}  id="" />
          </div>

          <textarea name="description" id="" className="input-description" onChange={handleChange} value={editProducts.description} ></textarea>


          <input type="submit" value='Create Product' className='btn positive-btn submit-btn' />

        </form> */}
      </div>
    </div>
  )
}

export default EditProduct