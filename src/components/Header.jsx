// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand-name">BEN MERLOTTI</NavLink>

      
      <nav className="site-nav">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/edit-shoot">Edit & Shoot</NavLink>
        <NavLink to="/vfx-3d">VFX & 3D</NavLink>
        <NavLink to="/dev">Dev</NavLink>
      </nav>
    </header>
  );
};

export default Header;