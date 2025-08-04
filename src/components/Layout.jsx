// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import './Layout.css';

const Layout = () => {
  return (
    <div className="site-container">
      <Header />
      <main className="content-container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;