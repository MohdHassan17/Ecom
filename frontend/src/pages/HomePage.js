import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext' // Adjust the import path accordingly
import CartContext from '../context/CartContext'
import ProductContext from '../context/ProductContext'
import Landing from '../components/Landing'
import Burger from '../assets/images/beef.png'
import CategoryIMG from '../assets/images/category.png'
import '../assets/css/Landing.css'

const HomePage = () => {
    const { authTokens } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)
    const { products } = useContext(ProductContext)
    const navigate = useNavigate()

    const viewProductDetails = (productId) => {
        navigate(`/product/${productId}`)
        console.log(productId)
    }

    const carouselList = [Burger, CategoryIMG]
    const [carouselIndex, setCarouselIndex] = useState(0)

    const changeCarouselImage = (method) => {
        if (method === 'next') {
            setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselList.length)
        } else if (method === 'previous') {
            setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselList.length) % carouselList.length)
        }
    }

    return (
        <div>
            <Landing />


            <div className="section-gradient">


                <div className="featured-products-container">
                    <div className="featured-heading-container">
                        <p className="featured-subheading">Always tasty Hot Dogs</p>
                        <h1 className="featured-heading">Choose & Enjoy</h1>
                        <p className="featured-description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque doloribus numquam rem maiores quis corporis? Quia excepturi repudiandae officia! Fuga!
                        </p>
                    </div>

                    <div className="featured-cards-container">
                        {products.slice(0, 3).map((item) => (
                            <div className="featured-card" key={item.id}>
                                <div className="featured-img-container">
                                    <img src={Burger} alt="" className="featured-img" />
                                </div>
                                <div className="featured-card-text">
                                    <h1 className="featured-product-heading">{item.name}</h1>
                                    <p className="featured-product-description">
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, maiores.
                                    </p>
                                </div>
                                <div className="btn-container">
                                    <a className="landing-btn" onClick={() => addToCart(item.id)}>
                                        Order Now
                                    </a>
                                    <a className="landing-btn" onClick={() => viewProductDetails(item.id)}>
                                        View Product
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="categories-grid">
                    <div className="main-category">
                        <img src={CategoryIMG} alt="" className="category-img" />
                        <h1 className="category-heading">BURGERS</h1>
                    </div>
                    <div className="sub-category-container">
                        <div className="sub-category">
                            <img src={CategoryIMG} alt="" className="category-img" />
                            <h1 className="category-heading">Subway</h1>
                        </div>
                        <div className="sub-category">
                            <img src={CategoryIMG} alt="" className="category-img" />
                            <h1 className="category-heading">Subway</h1>
                        </div>
                    </div>
                </div>

                <div className="discover-events">
                    <div className="featured-heading-container">
                        <p className="featured-subheading">Always tasty Hot Dogs</p>
                        <h1 className="featured-heading">Choose & Enjoy</h1>
                        <p className="featured-description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque doloribus numquam rem maiores quis corporis? Quia excepturi repudiandae officia! Fuga!
                        </p>
                    </div>

                    <div className="carousel-container">
                        <button className="arrow-left" onClick={() => changeCarouselImage('previous')}>
                            ←
                        </button>
                        <img src={carouselList[carouselIndex]} className="carousel-img" alt="" />
                        <button className="arrow-right" onClick={() => changeCarouselImage('next')}>
                            →
                        </button>
                    </div>
                </div>


                <div className="reservation">
                    <div className="featured-heading-container">
                        <p className="featured-subheading">Always tasty Hot Dogs</p>
                        <h1 className="featured-heading">Choose & Enjoy</h1>
                        <p className="featured-description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque doloribus numquam rem maiores quis corporis? Quia excepturi repudiandae officia! Fuga!
                        </p>
                    </div>

                    <div className="contact-form-container">
                        <form action="" className='contact-form'>
                            <input type="text" name="Full Name" placeholder='Full Name' className='input-box' />
                            <input type="email" name='Email' placeholder='Email' className='input-box'/>
                            <input type="text" name="Date" placeholder='Date (dd/mm/yyyy)' className='input-box' />
                            <input type="text" name="" id="" placeholder='Time (AM/PM)' className='input-box'/>
                            <input type="text" placeholder='People' className='input-box'/>
                            <input type="submit" value="Submit" className='input-box input-submit' />
                        </form>


                    </div>
                </div>


            </div>


        </div>
    )
}

export default HomePage
