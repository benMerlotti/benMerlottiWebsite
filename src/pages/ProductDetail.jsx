// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './PageStyles.css';
import promoVideo from '../assets/VHS KARAOKE PROMO.mp4';
import tutorialVideo from '../assets/VHS KARAOKE TUTORIAL.mp4';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const ProductDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // Call your backend API to create a checkout session
      // Update this URL to match your backend (Vercel: /api/create-checkout-session, Netlify: /.netlify/functions/create-checkout-session)
      const API_URL = import.meta.env.VITE_API_URL || '/api/create-checkout-session';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: 'VHS KARAOKE TEXT TEMPLATE',
          price: 1999, // Price in cents ($19.99)
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error:', error);
        alert('There was an error processing your payment. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error processing your payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <button className="back-button" onClick={() => navigate('/store')}>
        ← Back to Store
      </button>
      
      <div className="product-detail">
        <h1>VHS KARAOKE TEXT TEMPLATE</h1>
        
        <div className="product-detail-content">
          <div className="product-videos">
            <div className="product-video-section">
              <h3>Promo Video</h3>
              <div className="product-video-container">
                <video 
                  controls 
                  className="product-video"
                  preload="metadata"
                >
                  <source src={promoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            
            <div className="product-video-section">
              <h3>Tutorial</h3>
              <div className="product-video-container">
                <video 
                  controls 
                  className="product-video"
                  preload="metadata"
                >
                  <source src={tutorialVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          <div className="product-detail-main">
            <div className="product-info">
              <div className="product-price-purchase">
                <div className="product-price-large">$19.99</div>
                <button 
                  className="purchase-button-large" 
                  onClick={handlePurchase}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Purchase Template'}
                </button>
              </div>
              
              <p className="product-description-large">
                Professional After Effects template featuring retro VHS-style karaoke text animations. 
                Perfect for music videos, lyric videos, and nostalgic content.
              </p>
              
              <div className="product-features">
                <h3>Features:</h3>
                <ul>
                  <li>Customizable text elements</li>
                  <li>Smooth VHS-style animations</li>
                  <li>Easy-to-use controls</li>
                  <li>Compatible with After Effects CC 2018+</li>
                  <li>No plugins required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

