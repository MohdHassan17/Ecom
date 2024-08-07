import React from 'react'
import '../assets/css/Landing.css'
import LandingBG from '../assets/images/landing.jpg'
import Burger from '../assets/images/beef.png'


function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-bg-container">
      <img src={LandingBG} alt="" className="landing-bg-img" />

      </div>
        <div className="landing-text-container">
          <div className="landing-txt-btn-container">
            <div className="landing-txt">
              <h1 className="landing-heading">
                Classic Hot Dogs
              </h1>
            </div>
            <div className="landing-btn-container">
              <a href="/" className='landing-btn'>Order Now</a>
              <a href="/"className='landing-btn'>View Product</a>
            </div>
          </div>
          <div className="landing-img-container">
            <img src={Burger} alt="" className='landing-img' />
          </div>
        </div>
    </div>
  )
}

export default Landing