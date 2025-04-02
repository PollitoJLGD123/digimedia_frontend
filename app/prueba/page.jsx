"use client";

import React, { useState, useEffect } from "react";

export default function ScrollExample() {
  const [activeSection, setActiveSection] = useState("");

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".section");
    console.log(sections)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            console.log(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div>
      {/* Menú de navegación */}
      <div style={{ position: "fixed", top: 0, left: 0, background: "white", padding: "10px" }}>
        {["section1", "section2", "section3"].map((section) => (
          <button
            key={section}
            onClick={() => handleScrollTo(section)}
            style={{
              margin: "5px",
              padding: "10px",
              background: activeSection === section ? "blue" : "gray",
              color: "white",
              border: "none",
            }}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Secciones */}
      <div style={{ marginTop: "50px", padding: "10px" }}>
        <div id="section1" className="section" style={{ height: "100vh", border: "1px solid black" }}>
          <h2>Sección 1</h2>
        </div>
        <div id="section2" className="section" style={{ height: "100vh", border: "1px solid black" }}>
          <h2>Sección 2</h2>
        </div>
        <div id="section3" className="section" style={{ height: "100vh", border: "1px solid black" }}>
          <h2>Sección 3</h2>
        </div>
      </div>
    </div>
  );
}
