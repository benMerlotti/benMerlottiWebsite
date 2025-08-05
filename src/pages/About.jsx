// src/pages/Vfx3D.jsx
import React from "react";
import { projects } from "../data/projects";
import "./PageStyles.css"; // We'll create a shared style file

const About = () => {
  return (
    <div className="page-content">
      <h1>About</h1>
      <div className="about-text">
        <p>
          Ben Merlotti is a multidisciplinary creative professional specializing
          in visual effects, 3D animation, video production, and web
          development. With a passion for both technical precision and artistic
          expression, Ben brings a unique blend of technical expertise and
          creative vision to every project. Currently Ben is managing multiple
          productions for Druid Productions, a video company that handles photo
          and video capture for tradeshow events across the US, on a freelance
          basis.
        </p>
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
