import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    let {cart} = useContext(CartContext)



    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <div>
                     <p onClick={logoutUser}>Logout</p>

                    <a href='/cart'><h1>{cart && cart.get_cart_quantity}</h1></a>
                     
                </div>
               
                
            ) : (
                <Link to="/login" >Login</Link>
            )}
            {user && <p>Hello {user.username}!</p>}

        </div>
    )
}

export default Header