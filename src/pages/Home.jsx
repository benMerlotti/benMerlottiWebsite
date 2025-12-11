// src/pages/Home.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import PngSequencePlayer from '../components/PngSequencePlayer';
import './PageStyles.css';
import helloAnimation from '../assets/hello-animation/hello-animation.webm';

// Import all PNG frames
const frameModules = import.meta.glob('../assets/hello-animation/Hello_*.png', { eager: true });
const framePaths = Object.keys(frameModules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/Hello_(\d+)/)?.[1] || '0');
    const numB = parseInt(b.match(/Hello_(\d+)/)?.[1] || '0');
    return numA - numB;
  })
  .map(path => frameModules[path].default || frameModules[path]);

const Home = () => {
  const text = 'ⒽⒺⓁⓁⓄ';
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
             (window.innerWidth <= 768);
    };
    
    setIsMobile(checkMobile());
    
    // If mobile, the PNG sequence player will handle completion
    if (checkMobile()) {
      return;
    }

    // Desktop: use video
    const video = videoRef.current;
    if (video) {
      // Check if video can play (handles iOS Safari WebM issues)
      const canPlay = video.canPlayType('video/webm');
      
      // If WebM is not supported or video fails to load, show text immediately
      const handleError = () => {
        console.log('Video failed to load, showing text instead');
        setAnimationComplete(true);
      };

      const handleLoadedData = () => {
        // Try to play when video is loaded
        video.play().catch(err => {
          console.log('Autoplay failed, showing text instead:', err);
          setAnimationComplete(true);
        });
      };

      // When animation ends, show the hoverable text
      const handleEnded = () => {
        setAnimationComplete(true);
      };

      video.addEventListener('error', handleError);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('ended', handleEnded);

      // If WebM is not supported, skip animation
      if (!canPlay) {
        console.log('WebM not supported, showing text instead');
        setAnimationComplete(true);
      }

      return () => {
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className="page-content home-page">
      <div className="home-content">
        <h1 className="home-hello hello-container">
          {!animationComplete ? (
            isMobile ? (
              <PngSequencePlayer
                frames={framePaths}
                fps={24}
                onEnd={() => setAnimationComplete(true)}
                className={`hello-animation-video ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
              />
            ) : (
              <video
                ref={videoRef}
                className={`hello-animation-video ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
                src={helloAnimation}
                playsInline
                muted
                preload="auto"
              />
            )
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