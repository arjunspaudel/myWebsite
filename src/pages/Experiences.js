import React from 'react';
import { Helmet } from 'react-helmet-async';

const experiences = [
  {
    title: "Design Handover Engineer",
    company: "Olkiluoto Nuclear Power Plant, Kaiku HR, AREVA N.P",
    period: "April 2020 – Present",
    responsibilities: [
      "Prepared and structured technical documentation packages in accordance with equipment, WBS, and Plant St. code (KKS).",
      "Liaised with clients (TVO) to address comments and ensure the accuracy and completeness of final documentation packages.",
      "Collaborated with engineering departments and suppliers to resolve metadata issues within documents.",
      "Regularly participated in bi-weekly client meetings, summarized discussions, and prepared minutes of meetings (MOM).",
      "Developed instruction files and trained new team members, fostering a collaborative work environment."
    ]
  },
  {
    title: "Bachelor's Thesis: Bicycle Driven by Pneumatic Cylinder",
    company: "",
    period: "November 2018 – January 2019",
    responsibilities: [
      "Designed a pneumatic system for reciprocating motion to power a bicycle.",
      "Engineered and modeled an assistive transmission system.",
      "Performed physics calculations related to the dynamics and mechanics of bicycle operation."
    ]
  }
];

const ExperiencesPage = () => {
  return (
    <>
      <Helmet>
        <title>AP - Experiences</title>
      </Helmet>     
    <div className="p-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Experiences</h1>
      <div className="grid grid-cols-1 gap-8">
        {experiences.map((experience, index) => (
          <div key={index} className="bg-lightOrange p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{experience.title}</h2>
            <p className="text-base md:text-lg lg:text-xl text-justify">
              {experience.company}<br />
              {experience.period}
            </p>
            <ul className="list-disc list-inside mt-4">
              {experience.responsibilities.map((responsibility, idx) => (
                <li key={idx} className="text-base md:text-lg lg:text-xl text-justify">{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ExperiencesPage;
