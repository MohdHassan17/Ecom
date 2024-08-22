import React, { useContext, useState } from 'react';
import '../../../assets/css/admin/ProductModule/AddProduct.css';
import ProductManagementContext from '../../../context/admin/ProductManagementContext';
import { FileUploader } from 'react-drag-drop-files';
import { AiFillProduct } from 'react-icons/ai';
import imageCompression from 'browser-image-compression';

function AddProduct() {
  const { addProductDetails, setAddProductDetails, setProductImg, uploadImage } = useContext(ProductManagementContext);
  const fileTypes = ["JPG", "PNG", "GIF"]; // Accepted file types

  const handleChange = (e) => {
    setAddProductDetails({ ...addProductDetails, [e.target.name]: e.target.value });
  };

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
      setProductImg(compressedFile);
    } catch (error) {
      console.error('Error compressing and converting the image:', error);
    }
  };

  return (
    <div>
      <div className="add-product-form-container">
        <div className="inventory-container">
          <div className="header">
            <div className="heading">
              <AiFillProduct size={25} color={'#0451a9'} />
              <h3>Product Management</h3>
            </div>
          </div>
        </div>

        <form className='form' onSubmit={uploadImage}>
          <FileUploader
            handleChange={handleImgChange}
            name="file"
            types={fileTypes}
          />
          <div className="form-img-container"></div>

          <div className="input-container">
            <label htmlFor="name">Product Name:</label><br />
            <input type="text" className='input-text' name="name" placeholder='Name' onChange={handleChange} id="" />
          </div>

          <div className="input-container">
            <label htmlFor="price">Product Price:</label><br />
            <input type="number" className='input-text' name="price" placeholder='Price' onChange={handleChange} id="" />
          </div>

          <div className="input-container">
            <label htmlFor="available_quantity">Available Quantity:</label><br />
            <input type="number" className='input-text' name="available_quantity" placeholder='Quantity' onChange={handleChange} id="" />
          </div>

          <div className="input-container">
            <label htmlFor="description">Description:</label><br />
            <textarea name="description" id="" className="input-description" onChange={handleChange} placeholder='Write something nice about your product...'></textarea>
          </div>

          <input type="submit" value='Create Product' className='admin-btn dark-btn submit-btn' />
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
