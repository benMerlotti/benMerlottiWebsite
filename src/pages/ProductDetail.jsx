// src/pages/ProductDetail.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';

// YouTube video URLs
const PROMO_VIDEO_URL = 'https://youtu.be/wduwpI3OFGQ';
const TUTORIAL_VIDEO_URL = 'https://youtu.be/Fv14Drjuo5g';

// Helper function to extract YouTube video ID and create embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  
  let videoId;
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1];
  } else if (url.includes('v=')) {
    videoId = url.split('v=')[1];
  } else if (url.includes('youtube.com/watch/')) {
    videoId = url.split('youtube.com/watch/')[1];
  }
  
  if (videoId && videoId.includes('&')) videoId = videoId.split('&')[0];
  if (videoId && videoId.includes('?')) videoId = videoId.split('?')[0];
  
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&showinfo=0` : null;
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // Check if Stripe publishable key is set
      if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
        alert('Stripe is not configured. Please contact support.');
        setLoading(false);
        return;
      }

      // Call your backend API to create a checkout session
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

      // Check if response is ok
      if (!response.ok) {
        // Handle 404 specifically (API endpoint not found)
        if (response.status === 404) {
          throw new Error(
            'API endpoint not found. Make sure you\'re running with "vercel dev" instead of "npm run dev" to test the payment flow locally.'
          );
        }
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Check if checkout URL exists
      if (!data.url) {
        throw new Error(data.error || 'No checkout URL received from server');
      }

      // Redirect directly to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment Error: ${error.message || 'There was an error processing your payment. Please try again.'}`);
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
            {PROMO_VIDEO_URL && getYouTubeEmbedUrl(PROMO_VIDEO_URL) && (
              <div className="product-video-section">
                <h3>Promo Video</h3>
                <div className="product-video-container">
                  <iframe
                    src={getYouTubeEmbedUrl(PROMO_VIDEO_URL)}
                    title="VHS Karaoke Promo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="product-video"
                  ></iframe>
                </div>
              </div>
            )}
            
            {TUTORIAL_VIDEO_URL && getYouTubeEmbedUrl(TUTORIAL_VIDEO_URL) && (
              <div className="product-video-section">
                <h3>Tutorial</h3>
                <div className="product-video-container">
                  <iframe
                    src={getYouTubeEmbedUrl(TUTORIAL_VIDEO_URL)}
                    title="VHS Karaoke Tutorial Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="product-video"
                  ></iframe>
                </div>
              </div>
            )}
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

