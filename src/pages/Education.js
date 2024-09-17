import React from 'react';
import { Helmet } from 'react-helmet-async';

const Education = () => {
  return (
    <>
      <Helmet>
        <title>AP - Education</title>
      </Helmet>     
    <div className="p-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Education</h1>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-lightOrange p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Bachelor's Degree in Mechanical Engineering and Production Technology</h2>
          <p className="text-base md:text-lg lg:text-xl text-justify">
            Saimaa University of Applied Sciences, Lappeenranta, Finland<br />
            September 2015 – February 2019<br />
            GPA: 4.2/5
          </p>
          <p className="text-base md:text-lg lg:text-xl text-justify mt-4">
            During my studies, I developed a strong foundation in mechanical engineering principles and gained hands-on experience in designing and analyzing mechanical systems. My coursework included a focus on machine design, engineering mechanics, statics and dynamics, mathematical programming, and automation systems. Additionally, I completed various design and modeling projects, which enhanced my technical and problem-solving skills.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Education;
