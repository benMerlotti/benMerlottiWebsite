import React from 'react';
import { projects } from '../data/projects';
import './PageStyles.css';

const Reel = () => {
  // Find the reel project
  const reelProject = projects.find(p => p.category === 'reel');

  return (
    <div className="page-content reel-container">
      {reelProject && reelProject.vimeoUrl ? (
        <div className="reel-video-container">
          <iframe
            src={reelProject.vimeoUrl.replace('vimeo.com/', 'player.vimeo.com/video/') + '?autoplay=1&title=0&byline=0&portrait=0'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Reel Video"
          ></iframe>
        </div>
      ) : (
        <p>Reel video not found.</p>
      )}
    </div>
  );
};

export default Reel;