// src/pages/Contact.jsx
import React from 'react';
import './PageStyles.css';

const Contact = () => {
  return (
    <div className="page-content">
      <h1>Contact</h1>
      <div className="about-text">
        <p>
          For inquiries, collaborations, or questions, please reach out:
        </p>
        <p>
          <a href="mailto:benmerlotti@gmail.com" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>
            benmerlotti@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;

