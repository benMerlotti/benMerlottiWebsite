// src/pages/Vfx3D.jsx
import React from 'react';
import { projects } from '../data/projects';
import './PageStyles.css'; // We'll create a shared style file

const Dev = () => {
  const devProjects = projects.filter(p => p.category === 'dev');

  return (
    <div className="page-content">
      <h1>Dev</h1>
      <div className="video-grid-placeholder">
        [Video Grid Here - We will build the component next]
        <br/><br/>
        {devProjects.map(p => <div key={p.id}>{p.title}</div>)}
      </div>
    </div>
  );
};

export default Dev;