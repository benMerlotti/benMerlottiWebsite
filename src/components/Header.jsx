// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <NavLink to="/" className="brand-name">BEN MERLOTTI</NavLink>
      
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? 'light mode' : 'dark mode'}
      </button>
      
      <nav className="site-nav">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/reel">Reel</NavLink>
        <NavLink to="/edit-shoot">Director | DP | Editor</NavLink>
        <NavLink to="/vfx-3d">VFX & 3D</NavLink>
        <NavLink to="/dev">Dev</NavLink>
        <NavLink to="/store">Store</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
};

export default Header;