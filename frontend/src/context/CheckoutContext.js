import {React, useState, useEffect, createContext, useContext} from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'

const CheckoutContext = createContext()

export default CheckoutContext

export const CheckoutProvider = ({children}) => {

    const {authTokens} = useContext(AuthContext)
    const [shipping, setShipping] = useState([])

    const[shippingData, setShippingData] = useState({
      address_line1: '',
      address_line2: '',
      city: '',
      province:'',
      zip_code: '',
    })
    

    const getShippingDetails = async () => {
        try {
          const response = await axios.get(
            'http://127.0.0.1:8000/store/shipping-detail/',
            {
              headers: {
                'Authorization': `Bearer ${authTokens.access}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          if (response.status === 200) {  // Check for 200 status
         
    
              setShipping(response.data);
          } else {
            console.error('Could not fetch the cart');
          }
        } catch (error) {
          console.error('Error doing the thing:', error);
        }}
      // };
       


      const postShippingDetails = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post(
            'http://127.0.0.1:8000/store/shipping-detail/', shippingData,
            {
              headers: {
                'Authorization': `Bearer ${authTokens.access}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          console.log(response.status)
          getShippingDetails()
        } catch (error) {
          console.error(error)}}

    const context = {

      getShippingDetails: getShippingDetails,
      shipping: shipping,
      shippingData: shippingData,
      setShippingData: setShippingData,
      postShippingDetails: postShippingDetails
    }

    
    return (
    <CheckoutContext.Provider value={context}>
            {children}
    </CheckoutContext.Provider>)
}