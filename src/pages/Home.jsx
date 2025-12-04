// src/pages/Home.jsx
import React from 'react';
import './PageStyles.css';

const Home = () => {
  const text = 'ⒽⒺⓁⓁⓄ';
  
  return (
    <div className="page-content home-page">
      <div className="home-content">
        <h1 className="home-hello">
          {text.split('').map((char, index) => (
            <span key={index} className="home-hello-char">{char}</span>
          ))}
        </h1>
      </div>
    </div>
  );
};

export default Home; 