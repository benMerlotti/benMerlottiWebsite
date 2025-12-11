// src/components/PngSequencePlayer.jsx
import React, { useState, useEffect, useRef } from 'react';

const PngSequencePlayer = ({ 
  frames, 
  fps = 24, 
  onEnd, 
  className = '',
  style = {} 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [loadedFrames, setLoadedFrames] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const frameIntervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Load all frame images
  useEffect(() => {
    const loadFrames = async () => {
      // Reset state
      setLoadedFrames([]);
      setIsPlaying(false);
      setCurrentFrame(0);
      
      const imagePromises = frames.map((frame, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          // Ensure images are fully decoded before resolving
          img.onload = () => {
            // Wait a tick to ensure image is fully decoded
            requestAnimationFrame(() => {
              resolve({ index, img });
            });
          };
          img.onerror = reject;
          img.src = frame;
        });
      });

      try {
        const loaded = await Promise.all(imagePromises);
        const sorted = loaded.sort((a, b) => a.index - b.index);
        const images = sorted.map(item => item.img);
        
        // Small delay to ensure all images are ready
        await new Promise(resolve => setTimeout(resolve, 50));
        
        setLoadedFrames(images);
      } catch (error) {
        console.error('Error loading frames:', error);
      }
    };

    loadFrames();
  }, [frames]);

  // Play animation
  useEffect(() => {
    if (loadedFrames.length === 0 || !isPlaying) {
      return;
    }

    // Use requestAnimationFrame for smoother animation
    const frameDelay = 1000 / fps;
    let lastFrameTime = performance.now();
    let animationFrameId;

    const animate = (currentTime) => {
      const elapsed = currentTime - lastFrameTime;
      
      if (elapsed >= frameDelay) {
        setCurrentFrame(prev => {
          const next = prev + 1;
          if (next >= loadedFrames.length) {
            setIsPlaying(false);
            if (onEnd) onEnd();
            return prev;
          }
          lastFrameTime = currentTime;
          return next;
        });
      }
      
      if (isPlaying) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [loadedFrames, isPlaying, fps, onEnd]);

  // Start playing when frames are loaded
  useEffect(() => {
    if (loadedFrames.length > 0 && !isPlaying && loadedFrames.length === frames.length) {
      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        setIsPlaying(true);
        setCurrentFrame(0);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [loadedFrames, frames.length, isPlaying]);

  if (loadedFrames.length === 0) {
    return null;
  }

  const currentImage = loadedFrames[currentFrame];

  if (!currentImage) {
    return null;
  }

  return (
    <img
      src={currentImage.src}
      alt="Animation frame"
      className={className}
      style={style}
    />
  );
};

export default PngSequencePlayer;

