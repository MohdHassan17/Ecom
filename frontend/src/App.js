// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Nav from './components/Nav';
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute';
import CreateAccount from './pages/CreateAccount';
import ViewCart from './pages/ViewCart';
import { CartProvider } from './context/CartContext';
import ProductDetails from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import { CheckoutProvider } from './context/CheckoutContext';


import './App.css'
import { ProductManagementProvider } from './context/admin/ProductManagementContext.jsx';
import ProductListPage from './pages/admin/ProductModule/ProductListPage.jsx';
import AddProduct from './pages/admin/ProductModule/AddProduct.jsx';
import EditProduct from './pages/admin/ProductModule/EditProduct.jsx'
import OrderManagement from './pages/admin/OrderManagement/OrderManagement.jsx';
import { OrderManagementProvider } from './context/admin/OrderManagementContext.jsx';
import OrderDetails from './pages/admin/OrderManagement/OrderDetails.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* Admin Page Links */}








          <CartProvider>
            <ProductProvider>
              <CheckoutProvider>
                <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<UserRoutes/>}/>
                </Routes>






                

              </CheckoutProvider>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}


function UserRoutes() {
  return (
    <div>
      <Nav />
      <Routes>

        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/cart" element={<PrivateRoute><ViewCart /></PrivateRoute>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />

      </Routes>
    </div>
  );
}

function AdminRoutes() {
  return (
    <ProductManagementProvider>
    <OrderManagementProvider>

      <Routes>
        <Route path="/inventory" element={<ProductListPage />} />
        <Route path='/add-product' element={<AddProduct/>} />
        <Route path='/inventory/edit-product/:id' element={<EditProduct/>}/>
        <Route path='/order-management' element={<OrderManagement/>} />
        <Route path='/order-management/order/:id' element={<OrderDetails/>}/>
        {/* Add more admin routes as needed */}
      </Routes>
      </OrderManagementProvider>
    </ProductManagementProvider>
  );
}

export default App;
