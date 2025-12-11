// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './PageStyles.css';
import helloAnimation from '../assets/hello-animation/hello-animation.webm';

const Home = () => {
  const text = 'ⒽⒺⓁⓁⓄ';
  const [animationComplete, setAnimationComplete] = useState(false);
  const videoRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Play animation on load
      video.play().catch(err => {
        console.error('Error playing video:', err);
        // If autoplay fails, show text immediately
        setAnimationComplete(true);
      });

      // When animation ends, show the hoverable text
      const handleEnded = () => {
        setAnimationComplete(true);
      };

      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className="page-content home-page">
      <div className="home-content">
        <h1 className="home-hello hello-container">
          {!animationComplete ? (
            <video
              ref={videoRef}
              className={`hello-animation-video ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
              src={helloAnimation}
              playsInline
              muted
              preload="auto"
            />
          ) : (
            <>
              {text.split('').map((char, index) => (
                <span key={index} className="home-hello-char">{char}</span>
              ))}
            </>
          )}
        </h1>
      </div>
    </div>
  );
};

export default Home; 