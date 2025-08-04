// src/pages/Dev.jsx
import React from 'react';
import { projects } from '../data/projects';
import './PageStyles.css';

const Dev = () => {
  const devProjects = projects.filter(p => p.category === 'dev');

  return (
    <div className="page-content">
      <h1>Dev</h1>
      <div className="dev-project-container">
        {devProjects.map(project => (
          <div key={project.id} className="dev-project-item">
            <h3 className="dev-project-title">{project.title}</h3>
            {project.description && (
              <p className="dev-project-description">{project.description}</p>
            )}
            <div className="dev-project-footer">
              {project.techStack && (
                <div className="dev-project-tech">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
              <div className="dev-project-links">
                {project.gitUrl && (
                  <a 
                    href={project.gitUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="dev-project-link"
                  >
                    GitHub →
                  </a>
                )}
                {project.websiteUrl && (
                  <a 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="dev-project-link"
                  >
                    Website →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dev;