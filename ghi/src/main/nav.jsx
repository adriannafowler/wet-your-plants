import React from 'react';
import './nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">Logo</div>
      <div className="nav-links">
        {/* Add your navigation links here */}
        <a href="/plant-care" className="nav-item">Plant Care</a>
        <a href="/greenhouse" className="nav-item">Greenhouse</a>
        <a href="/signin" className="nav-item">Sign-In/Sign-Up</a>
        {/* Add more links as needed */}
      </div>
    </nav>
  );
};

export default Nav;