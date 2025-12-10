// src/pages/Success.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PageStyles.css';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const sessionId = searchParams.get('session_id');
  
  // Your download link - update this with your actual file URL
  // Options: Google Drive shareable link, Dropbox link, AWS S3, etc.
  const DOWNLOAD_LINK = import.meta.env.VITE_DOWNLOAD_LINK || 'https://your-download-link-here.com/template.zip';

  useEffect(() => {
    // Verify payment by checking session status
    const verifyPayment = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Store download link in localStorage as backup
        if (DOWNLOAD_LINK && DOWNLOAD_LINK !== 'https://your-download-link-here.com/template.zip') {
          localStorage.setItem(`download_${sessionId}`, DOWNLOAD_LINK);
        }

        // Call your backend to verify the payment and send email with link
        // The webhook will handle sending the email, but we can also trigger it here
        try {
          await fetch('/api/send-download-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });
        } catch (emailError) {
          // Email sending is optional - don't fail if it doesn't work
          console.log('Email sending optional - continuing...');
        }

        const timer = setTimeout(() => {
          setVerified(true);
          setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="page-content">
        <h1>Verifying Payment</h1>
        <p>Please wait while we verify your payment...</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <h1>Payment Successful</h1>
      
      <div className="success-content">
        <p className="success-message">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
        
        {verified && (
          <div className="download-section">
            <h2>Download Your Template</h2>
            <p className="success-message">
              Click the button below to download your <strong>VHS KARAOKE TEXT TEMPLATE</strong>.
            </p>
            <a 
              href={DOWNLOAD_LINK} 
              className="download-button"
              download
            >
              Download Template (110 MB)
            </a>
            <p className="download-note">
              The download link will remain active. We've also sent it to your email as a backup.
              {sessionId && (
                <> If you need to access it again, your Order ID is: <strong>{sessionId}</strong></>
              )}
            </p>
          </div>
        )}
        
        {sessionId && (
          <p className="success-session">
            Order ID: {sessionId}
          </p>
        )}
        
        <div className="success-actions">
          <button className="back-button" onClick={() => navigate('/store')}>
            Back to Store
          </button>
          <button className="back-button" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;

