import{  React, useEffect, useContext}from 'react'
import Logo from '../assets/images/logo.png'
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import '../assets/css/Navbar.css'

function Nav() {

  let { user, logoutUser } = useContext(AuthContext)
    let {cart} = useContext(CartContext)

  return (
    <header>
      <div className="nav-container">
        <div className="nav-logo-container">
          <img src={Logo} alt="" className="nav-logo" />
        </div>
        <ul className="nav-list">
          <li className="nav-list-items">Home</li>
          <li className="nav-list-items">Menu</li>
          <li className="nav-list-items">About</li>
          <a href="/cart"><li className="nav-list-items">{cart && cart.get_cart_total}</li></a>
          
        </ul>
      </div>
    </header>
  )
}

export default Nav