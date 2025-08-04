// src/pages/Vfx3D.jsx
import React, { useState, useMemo } from 'react';
import { projects } from '../data/projects';
import ProjectVideoItem from './ProjectVideoItem';
import CreditFilter from '../components/CreditFilter';
import './PageStyles.css';

const Vfx3D = () => {
  const [selectedCredits, setSelectedCredits] = useState([]);
  
  // Filter the projects to only show 'vfx' or '3d'
  const allVfxProjects = projects.filter(p => ['vfx', '3d'].includes(p.category));
  
  // Filter projects based on selected credits
  const filteredProjects = useMemo(() => {
    if (selectedCredits.length === 0) {
      return allVfxProjects;
    }
    
    return allVfxProjects.filter(project => {
      const projectCredits = project.credits || [];
      return selectedCredits.every(credit => projectCredits.includes(credit));
    });
  }, [allVfxProjects, selectedCredits]);

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
      <h1>VFX & 3D</h1>
      
      <CreditFilter 
        projects={allVfxProjects}
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

export default Vfx3D;