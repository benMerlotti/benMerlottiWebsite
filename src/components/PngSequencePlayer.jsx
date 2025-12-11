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
      const imagePromises = frames.map((frame, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve({ index, img });
          img.onerror = reject;
          img.src = frame;
        });
      });

      try {
        const loaded = await Promise.all(imagePromises);
        const sorted = loaded.sort((a, b) => a.index - b.index);
        setLoadedFrames(sorted.map(item => item.img));
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

    const frameDelay = 1000 / fps;
    startTimeRef.current = Date.now();

    frameIntervalRef.current = setInterval(() => {
      setCurrentFrame(prev => {
        const next = prev + 1;
        if (next >= loadedFrames.length) {
          setIsPlaying(false);
          if (onEnd) onEnd();
          return prev;
        }
        return next;
      });
    }, frameDelay);

    return () => {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
      }
    };
  }, [loadedFrames, isPlaying, fps, onEnd]);

  // Start playing when frames are loaded
  useEffect(() => {
    if (loadedFrames.length > 0 && !isPlaying) {
      setIsPlaying(true);
      setCurrentFrame(0);
    }
  }, [loadedFrames]);

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

