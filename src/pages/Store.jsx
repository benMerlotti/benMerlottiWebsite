// src/pages/Store.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';

const Store = () => {
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <h1>Store</h1>
      <div className="store-content">
        <div 
          className="product-card clickable"
          onClick={() => navigate('/store/vhs-karaoke-text-template')}
        >
          <h2>VHS KARAOKE TEXT TEMPLATE</h2>
          <p className="product-description">
            Professional After Effects template featuring retro VHS-style karaoke text animations. 
            Perfect for music videos, lyric videos, and nostalgic content. Includes customizable 
            elements, smooth animations, and easy-to-use controls.
          </p>
          <div className="product-price">$19.99</div>
          <div className="product-card-footer">
            <span className="view-details">View Details →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

