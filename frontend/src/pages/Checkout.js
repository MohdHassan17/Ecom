import { React, useState, useContext, useEffect } from 'react'
import CheckoutContext from '../context/CheckoutContext'
import CartContext from '../context/CartContext'
import axios from 'axios'
import AuthContext from '../context/AuthContext'


function Checkout() {
  const {authTokens} = useContext(AuthContext)
  const {cart, getCart} = useContext(CartContext)
  const { getShippingDetails, shipping, setShippingData, postShippingDetails, shippingData } = useContext(CheckoutContext)

  const [selectedShipping, setSelectedShipping] = useState(null)


  const orderData = {
    order: cart && cart.id,
    shipping: selectedShipping
  }

  console.log(orderData)
  useEffect(() => {
    getShippingDetails()
    console.log(shipping)
  }, [])

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value })

  }


  const confirmOrder = async() => {
    try{
      const response = await axios.post('http://127.0.0.1:8000/store/confirmed-order/', orderData,  {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    })

    getCart()

      console.log(response.status)

    }catch(error){
      console.log(error)
    }
  }
  



  return (
    <>

     



      {/* Shipping Details and Logic Here */}
      <div className="shipping-address">

        {shipping.map(i => (

          <div key={i.id}>

            <input type="radio" name='shippingSelect' value={i.id} onChange={(e)=>{setSelectedShipping(e.target.value)}}  />

            <div className="">{i.address_line1}</div>
            <div className="">{i.address_line2}</div>
            <div className="">{i.city}</div>
            <div className="">{i.province}</div>
            <div className="">{i.zip_code}</div>

          </div>


        ))}
      </div>


      <form onSubmit={postShippingDetails} className="add-shipping">
        <input type="text" name='address_line1' onChange={handleChange} placeholder='Address 1' />
        <input type="text" name='address_line2' onChange={handleChange} placeholder='Address 2' />
        <input type="text" name='city' onChange={handleChange} placeholder="city" />
        <input type="text" name='province' onChange={handleChange} placeholder='province 1' />
        <input type="text" name='zip_code' onChange={handleChange} placeholder='zipcode 1' />
        <input type="submit" value="Submit" />
      </form>

      {/* Order Confirmation Logic Here */}
      <div className="confirm-order">


            <button onClick={confirmOrder}> Proceed with Order</button>





      </div>

    </>
  )
}

export default Checkout