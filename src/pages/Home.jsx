// src/pages/Home.jsx
import React from 'react';
import './PageStyles.css';

const Home = () => {
  const asciiArt = `                                                  
 ▄▄    ▄▄  ▄▄▄▄▄▄▄▄  ▄▄        ▄▄          ▄▄▄▄   
 ██    ██  ██▀▀▀▀▀▀  ██        ██         ██▀▀██  
 ██    ██  ██        ██        ██        ██    ██ 
 ████████  ███████   ██        ██        ██    ██ 
 ██    ██  ██        ██        ██        ██    ██ 
 ██    ██  ██▄▄▄▄▄▄  ██▄▄▄▄▄▄  ██▄▄▄▄▄▄   ██▄▄██  
 ▀▀    ▀▀  ▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀    ▀▀▀▀   
                                                  
                                                  `;

  return (
    <div className="page-content home-page">
      <div className="home-content">
        <pre className="home-ascii">{asciiArt}</pre>
      </div>
    </div>
  );
};

export default Home; 