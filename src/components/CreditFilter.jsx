// src/components/CreditFilter.jsx
import React from 'react';
import './CreditFilter.css';

const CreditFilter = ({ projects, selectedCredits, onCreditToggle }) => {
  // Get all unique credits from the projects
  const allCredits = [...new Set(projects.flatMap(project => project.credits || []))].sort();

  return (
    <div className="credit-filter">
      <h3>Filter by Credits:</h3>
      <div className="credit-buttons">
        {allCredits.map(credit => (
          <button
            key={credit}
            className={`credit-button ${selectedCredits.includes(credit) ? 'active' : ''}`}
            onClick={() => onCreditToggle(credit)}
          >
            {credit}
          </button>
        ))}
      </div>
      {selectedCredits.length > 0 && (
        <div className="filter-info">
          Showing projects with: {selectedCredits.join(' & ')}
        </div>
      )}
    </div>
  );
};

export default CreditFilter; 