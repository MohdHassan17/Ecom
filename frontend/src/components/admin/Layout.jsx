import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../assets/css/admin/Layout.css';  // Ensure you have this CSS file
import User from '../../assets/images/user.png'

// Icon Imports
import { RiDashboard3Fill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { FaFileInvoiceDollar, FaUser } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";


const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    { icon: RiDashboard3Fill, name: "Dashboard", href: 'dashboard' },
    { icon: AiFillProduct, name: "Product Management", href: 'inventory' },
    { icon: FaFileInvoiceDollar, name: "Order Management", href: 'order-management' },
    { icon: FaUser, name: "User Management", href: 'user-management' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`layout ${isCollapsed ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <nav>
          <div className="nav-user-header">
            <img src={User} className='nav-user-image' alt="" />
            <div className="nav-user-details collapsed-text">
              <h4 className='nav-username'>Hassan Naseer</h4>
              <small className='nav-designation'>Manager</small>
            </div>
          </div>
          <ul className="sidebar-list">
            {links.map((link, index) => (
              <Link to={link.href} key={index} style={{ textDecoration: 'none' }}>
                <li className='sidebar-links'><link.icon size={20} /> <span className='collapsed-text'>{link.name}</span></li>
              </Link>
            ))}
          </ul>
          <div className="collapse-button" onClick={toggleSidebar}>
            {isCollapsed ? <TbLayoutSidebarLeftCollapseFilled size={40} style={{color: '#4BB543'}}/> : <TbLayoutSidebarLeftExpand size={40} style={{color: '#4BB543'}}/>}
          </div>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
    </div>
  );
};

export default Layout;
