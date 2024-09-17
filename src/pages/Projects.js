import React from 'react';
import { Helmet } from 'react-helmet-async';

const projects = [
  {
    title: "Design and Modeling of Screw Conveyor",
    period: "September 2018 – December 2018",
    institution: "Saimaa University of Applied Sciences",
    details: [
      "Led the project planning and execution process, focusing on developing engineering specifications and system design.",
      "Conducted strength and bearing lifetime calculations to ensure the durability and efficiency of the conveyor system.",
      "Developed 3D models and detailed engineering drawings to guide the construction process."
    ]
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
  }
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
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-base md:text-lg lg:text-xl text-justify">
              {project.period}<br />
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
