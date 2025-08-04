// src/pages/Vfx3D.jsx
import React from 'react';
import { projects } from '../data/projects';
import './PageStyles.css'; // We'll create a shared style file

const About = () => {

  return (
    <div className="page-content">
        <h1>About</h1>
      <div className="about-text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <br/><br/>
      </div>
    </div>
  );
};

export default About;