// src/pages/Vfx3D.jsx
import React from "react";
import { projects } from "../data/projects";
import "./PageStyles.css"; // We'll create a shared style file
import profileImage from "../assets/profileImage.jpg";

const About = () => {
  return (
    <div className="page-content">
      <div className="about-text">
        <p>
          Ben Merlotti is a multidisciplinary creative professional specializing
          in visual effects, 3D animation, video production, and web/software
          development. With a passion for both technical precision and artistic
          expression, Ben brings a unique blend of technical expertise and
          creative vision to every project.
        </p>
        <br />
      </div>
      <div className="about-profile-image" style={{ textAlign: "left", marginBottom: "2rem" }}>
        <img
          src={profileImage}
          alt="Ben Merlotti Profile"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover"
          }}
        />
      </div>
    </div>
  );
};

export default About;
