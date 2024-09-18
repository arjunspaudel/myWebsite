import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaGlobe, FaEye, FaDownload } from 'react-icons/fa';
import ThesisPDF from '../pdf/Thesis.pdf';

const experiences = [
  {
    title: "Design Handover Engineer",
    company: "Olkiluoto Nuclear Power Plant, Kaiku HR, AREVA N.P",
    companyLink: "https://www.tvo.fi/en/index/production/plantunits/ol3.html",
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
    company: "Saimaa University of Applied Sciences",
    period: "November 2018 – January 2019",
    responsibilities: [
      "Designed a pneumatic system for reciprocating motion to power a bicycle.",
      "Engineered and modeled an assistive transmission system.",
      "Performed physics calculations related to the dynamics and mechanics of bicycle operation."
    ],
    thesisPDF: ThesisPDF
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
            <h2 className="text-2xl font-semibold mb-2">
              {experience.title}
              {experience.thesisPDF && (
                <>
                  <a 
                    href={experience.thesisPDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 inline-flex items-center text-blue-800 hover:text-blue-600"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(experience.thesisPDF, '_blank');
                    }}
                  >
                    <FaEye className="text-xl" title="View Thesis" />
                  </a>
                  <a 
                    href={experience.thesisPDF}
                    download="Thesis.pdf"
                    className="ml-2 inline-flex items-center text-blue-800 hover:text-blue-600"
                  >
                    <FaDownload className="text-xl" title="Download Thesis" />
                  </a>
                </>
              )}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-justify">
              {experience.company}
              {experience.companyLink && (
                <a 
                  href={experience.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center text-blue-800 hover:text-blue-600"
                >
                  <FaGlobe className="text-xl" />
                </a>
              )}
              <br />
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
