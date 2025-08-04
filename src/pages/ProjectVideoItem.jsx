// src/components/ProjectVideoItem.jsx
import React from 'react';

// This helper function is better placed outside the component
const getVideoEmbedUrl = (project) => {
  // YOUTUBE
  if (project.youtubeUrl) {
    let videoId;
    if (project.youtubeUrl.includes('youtu.be/')) videoId = project.youtubeUrl.split('youtu.be/')[1];
    else if (project.youtubeUrl.includes('v=')) videoId = project.youtubeUrl.split('v=')[1];
    if (videoId && videoId.includes('&')) videoId = videoId.split('&')[0];
    // This is the corrected URL with the '?'
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&showinfo=0` : null;
  }
  
  // VIMEO (Using standard controls for a portfolio piece)
  if (project.vimeoUrl) {
    let videoId = project.vimeoUrl.split('vimeo.com/')[1];
    if (videoId && videoId.includes('?')) videoId = videoId.split('?')[0];
    // NOTE: I've changed the params here to be better for a portfolio piece
    // 'background=1' hides all controls. You likely want controls.
    return videoId ? `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&color=ffffff` : null;
  }

  return null;
};


const ProjectVideoItem = ({ project }) => {
  const embedUrl = getVideoEmbedUrl(project);

  return (
    <div className="video-item">
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
          <p className="credits">{project.credits.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectVideoItem;