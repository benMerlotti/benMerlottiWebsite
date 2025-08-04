// src/pages/Video.jsx
import React, { useState, useMemo } from 'react';
import { projects } from '../data/projects';
import ProjectVideoItem from './ProjectVideoItem';
import CreditFilter from '../components/CreditFilter';
import './PageStyles.css';

const Video = () => {
  const [selectedCredits, setSelectedCredits] = useState([]);
  
  // Filter the projects to show video-related categories
  const allVideoProjects = projects.filter(p => 
    ['product-video', 'digital-ad', 'film', 'music-video', 'social-media'].includes(p.category)
  );
  
  // Filter projects based on selected credits
  const filteredProjects = useMemo(() => {
    if (selectedCredits.length === 0) {
      return allVideoProjects;
    }
    
    return allVideoProjects.filter(project => {
      const projectCredits = project.credits || [];
      return selectedCredits.every(credit => projectCredits.includes(credit));
    });
  }, [allVideoProjects, selectedCredits]);

  const handleCreditToggle = (credit) => {
    setSelectedCredits(prev => {
      if (prev.includes(credit)) {
        return prev.filter(c => c !== credit);
      } else {
        return [...prev, credit];
      }
    });
  };

  return (
    <div className="page-content">
      <h1>Edit | Shoot | Direct</h1>
      
      <CreditFilter 
        projects={allVideoProjects}
        selectedCredits={selectedCredits}
        onCreditToggle={handleCreditToggle}
      />
      
      <div className="video-grid">
        {filteredProjects.map(project => (
          <ProjectVideoItem key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && selectedCredits.length > 0 && (
        <div className="no-results">
          <p>No projects found with the selected credits.</p>
        </div>
      )}
    </div>
  );
};

export default Video;