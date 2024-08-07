import React, { createContext, useEffect, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Renamed context and provider
const ProductManagementContext = createContext();

export default ProductManagementContext;

export const ProductManagementProvider = ({ children }) => {

  const navigate = useNavigate()


  const [products, setProducts] = useState([]);


  const [productImg, setProductImg] = useState(null)
  const [downloadURL, setDownloadURL] = useState('')
  const [addProductDetails, setAddProductDetails] = useState({
    
    name: '',
    price: '',
    description: '',
    available_quantity: ''
  })
  const getProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/store/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
   
    getProducts();
  }, []);




  const uploadImage = async (e) => {
      e.preventDefault()
      if(productImg){
        const storageRef = ref(storage, `files/${productImg.name}`)
        const uploadTask = uploadBytesResumable(storageRef, productImg);

      uploadTask.on(
        'state_changed',
        null,
        null,
        ()=>{

        
            getDownloadURL(uploadTask.snapshot.ref).then((URL)=>{
            
              console.log(URL)
              console.log(addProductDetails)
              uploadProduct(URL)
              
            })
      
       
        }
      )
          
        
      }
  }

  const uploadProduct = (url) => {
    axios.post("http://127.0.0.1:8000/admin/create-product/", {...addProductDetails, image:url})
    .then(response => {
      
      console.log(response.data);
    })
    .catch(error => {
      
      console.error("There was an error!", error);
    });




  }




  const [editProducts, setEditProducts] = useState({
    
    image: '',
    name: ' ',
    price: '',
    available_quantity: '',
    description: '',
  })
  

  const [editImage, setEditImage] = useState(null)




  const editUploadImage = async (e, id) => {
    e.preventDefault()
    if(editImage){
      const storageRef = ref(storage, `files/${editImage.name}`)
      const uploadTask = uploadBytesResumable(storageRef, editImage);

    uploadTask.on(
      'state_changed',
      null,
      null,
      ()=>{

      
          getDownloadURL(uploadTask.snapshot.ref).then((URL)=>{
          
            console.log(URL)
            
            editUploadProduct(URL, id)
            
            navigate('/admin/inventory')
            
          })
    
     
      }
    )
        
      
    } else{
      editUploadProduct(null, id)
      navigate('/admin/inventory')
            
    }
}



const editUploadProduct = (url, id) => {
  axios.patch( `http://127.0.0.1:8000/admin/edit-product/${id}/`, {...editProducts, image:url})
  .then(response => {
    
    console.log(response.data);
  })
  .catch(error => {
    
    console.error("There was an error!", error);
  });




}




  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/admin/delete-product/${productId}/`);
      if (response.status === 204) {
        // Handle successful deletion, e.g., remove the product from the UI
        console.log('Product deleted successfully');
        getProducts()
      } else {
        console.log('Failed to delete the product');
      }
    } catch (error) {
      console.error('There was an error deleting the product:', error);
    }

  };



  const context = {
    products: products,
    handleDelete: handleDelete,
    setProductImg: setProductImg,
    addProductDetails: addProductDetails,
    setAddProductDetails: setAddProductDetails,
    editProducts: editProducts,
    setEditProducts: setEditProducts,
    uploadImage: uploadImage,
    editUploadImage: editUploadImage,
    editImage: editImage,
    setEditImage: setEditImage

  };

  return (
    <ProductManagementContext.Provider value={context}>
      {children}
    </ProductManagementContext.Provider>
  );
};
