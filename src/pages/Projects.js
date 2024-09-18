import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaDownload, FaGlobe } from 'react-icons/fa';
import ScrewConveyorPDF from '../pdf/Screw Conveyor Final report.pdf';
import SolidWorksPrject from '../pdf/SOLIDWORKS-design challenge.pdf';

const projects = [
  {
    title: "Design and Modeling of Screw Conveyor",
    period: "September 2018 – December 2018",
    institution: "Saimaa University of Applied Sciences",
    details: [
      "Led the project planning and execution process, focusing on developing engineering specifications and system design.",
      "Conducted strength and bearing lifetime calculations to ensure the durability and efficiency of the conveyor system.",
      "Developed 3D models and detailed engineering drawings to guide the construction process."
    ],
    reportPDF: ScrewConveyorPDF
  },
  {
    title: "Design and Construction of Hand-Powered Tri-Cycle",
    period: "September 2016 – April 2017",
    institution: "Saimaa University of Applied Sciences",
    details: [
      "Engaged in brainstorming and idea generation for concept development and selection.",
      "Performed load distribution calculations and 2D sketching to optimize the design.",
      "Created 3D models and manufacturing drawings for the hand-powered tri-cycle.",
      "Participated in the manufacturing process, including welding, grinding, and assembly of the final product."
    ]
  },
  {
    title: "Automation Laboratories",
    period: "January 2016 – April 2016",
    institution: "Saimaa University of Applied Sciences",
    details: [
      "Gained hands-on experience with pneumatic systems and PLC programming.",
      "Worked on optimizing Festo MPS stations and robot programming to improve efficiency.",
      "Participated in station automation processes aimed at enhancing production workflows."
    ]
  },
  {
    title: "SOLIDWORKS Model Mania®  Challenge",
    institution: "Dassault Systèmes",
    details: [
      "I have successfully completed all Model Mania® challenges hosted by Dassault Systèmes at the 3DEXPERIENCE World, showcasing advanced proficiency in SOLIDWORKS. Model Mania tests both accuracy and speed in part modeling and simulation, including design changes and analysis for the minimum factor of safety. Completing these challenges highlights my expertise in real-world engineering tasks, time management, and problem-solving using SOLIDWORKS."
    ],
    reportPDF: SolidWorksPrject,
    webLink: "https://blogs.solidworks.com/tech/2023/02/25-years-of-model-mania.html"
  },
];

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>AP - Projects</title>
      </Helmet>     
    <div className="p-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-lightOrange p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">
              {project.title}
              {project.reportPDF && (
                <>
                  <a 
                    href={project.reportPDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center text-blue-800 hover:text-blue-600"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(project.reportPDF, '_blank');
                    }}
                  >
                    <FaEye className="text-xl" title="View Report" />
                  </a>
                  <a 
                    href={project.reportPDF}
                    download={project.title === "SOLIDWORKS Model Mania®  Challenge" ? "SOLIDWORKS-design challenge.pdf" : "Screw Conveyor Final report.pdf"}
                    className="ml-2 inline-flex items-center text-blue-800 hover:text-blue-600"
                  >
                    <FaDownload className="text-xl" title="Download Report" />
                  </a>
                </>
              )}
              {project.webLink && (
                <a 
                  href={project.webLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center text-blue-800 hover:text-blue-600"
                >
                  <FaGlobe className="text-xl" title="Visit Model Mania Webpage" />
                </a>
              )}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-justify">
              {project.period && (
                <>
                  {project.period}<br />
                </>
              )}
              {project.institution}
            </p>
            <ul className="list-disc list-inside mt-4">
              {project.details.map((detail, idx) => (
                <li key={idx} className="text-base md:text-lg lg:text-xl text-justify">{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ProjectsPage;
