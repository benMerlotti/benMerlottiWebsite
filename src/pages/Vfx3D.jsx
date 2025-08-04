// src/pages/Vfx3D.jsx
import React from 'react';
import { projects } from '../data/projects';
import './PageStyles.css';

const Vfx3D = () => {
  const vfxProjects = projects.filter(p => p.category === 'vfx' || p.category === '3d');

  // Function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    let videoId;
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1];
    }
    
    // Remove any additional parameters
    if (videoId && videoId.includes('&')) {
      videoId = videoId.split('&')[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <div className="page-content">
      <h1>VFX & 3D</h1>
      <div className="video-grid">
        {vfxProjects.map(project => {
          const embedUrl = getYouTubeEmbedUrl(project.youtubeUrl);
          
          return (
            <div key={project.id} className="video-item">
              <div className="video-container">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={project.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="video-placeholder">
                    <p>Video not available</p>
                  </div>
                )}
              </div>
              <div className="video-info">
                <h3>{project.title}</h3>
                {project.credits && (
                  <p className="credits">
                    {project.credits.join(', ')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vfx3D;